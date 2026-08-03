# Firebase Migration Plan

Migrate from GitHub Pages + git-stored images to **Firebase Hosting** (classic, not App Hosting) + **Firebase Storage**.

## Decisions (confirmed)

- **Image storage**: Firebase Storage bucket (`<project>.appspot.com`), fully out of git, served via public storage URLs built by a small `StorageService`.
- **Upload flow**: new images are uploaded manually via `scripts/upload-images.mjs` (or `gsutil`); git never contains binaries.
- **History**: stop tracking `src/assets` going forward; do **not** rewrite git history (no force-push coordination).

## Architecture

- **Site**: Firebase Hosting serves the Angular 22 SPA at `ddgymnastics.com`.
- **Images**: Cloud Storage for Firebase bucket, public-read rules, referenced by URL.
- Firebase Hosting cannot proxy a Storage bucket (rewrites only support local files, Cloud Functions, or Cloud Run), so images are served via public storage URLs — the same pattern as the reverted `hook-up-supabase` attempt.

## Phase 0 — Scaffold Firebase

1. Create a Firebase project in the [console](https://console.firebase.google.com); note the project ID and default bucket `<project>.appspot.com`.
2. `npm i -D firebase-tools`
3. `npx firebase login`
4. `npx firebase init hosting storage` (repo root)
5. `firebase.json`:
   - `hosting.public` → `dist/double-dutch-website/browser`
   - `hosting.rewrites` → `[{ "source": "**", "destination": "/index.html" }]` (replaces the `404.html` SPA hack)
   - `storage.rules` → public read on `/images/{file}`
6. Add `src/environments/environment.ts` (gitignored) + committed `environment.example.ts` holding the bucket/project ID.

## Phase 1 — Move images out of git

7. Write `scripts/upload-images.mjs` (uses `@google-cloud/storage`) to upload the webp files actually referenced (~15): the 10 `data.service.ts` paths, hero `team-bars-cropped.webp`, `logo.webp`, and schedule images, to bucket path `/images/` with `cacheControl: public, max-age=31536000, immutable`.
8. Add `StorageService.getImageUrl(path)` → `https://firebasestorage.googleapis.com/v0/b/<bucket>/o/images/<encodeURIComponent(path)>?alt=media`. No `firebase` npm package needed in the app.
9. Update image references:
   - `src/app/shared/services/data.service.ts` paths → image keys via the service
   - `src/app/features/home/home.component.html` hero → service
   - `src/app/shared/components/header/header.component.html` logo → service
10. Remove `src/assets` from `angular.json` `assets`; add `src/assets` to `.gitignore`.

## Phase 2 — Switch hosting

11. Rewrite `.github/workflows/deploy.yml`: on push to `main` → `npm ci && npm run build` → `firebase deploy --only hosting`, authenticated via `google-github-actions/auth` + `GCP_SA_KEY` secret (or `w9jds/firebase-action@v13`).
12. Add custom domain `ddgymnastics.com` in the Firebase console: TXT verification, then A records `151.101.1.195` and `151.101.65.195`. Delete the `CNAME` file; disable GitHub Pages.
13. Optional: Firebase preview channels per PR (`firebase hosting:channel:deploy`).

## Phase 3 — Cleanup (no history rewrite)

14. Delete superseded files once live: `bootstrap-index.html`, root `index.html`, `src-html/`, old Pages workflow. Leave old blobs in git history.

## Effect on feature-branch → main merges

- **Git stays small**: a feature branch adds only a code pointer (e.g. `imagePath: '4I6A2769.webp'`); the photo itself is uploaded to the bucket before merging. PRs have no binary diffs.
- **Ordering rule (new)**: the code referencing an image must not merge before the image is uploaded, otherwise the deployed site shows a broken image. Run `npm run images:upload` before merging.
- **Code-only merges are unchanged**: they trigger the same CI → `firebase deploy --only hosting` on merge to main.
- **Rollback is asymmetric**: reverting a merge rolls back Hosting, but images already uploaded to Storage linger in the bucket (unreferenced). Keep image keys versioned/immutable (e.g. `v2/...`) to avoid stale-cache surprises.
- **DNS is a one-time cutover**: point `ddgymnastics.com` A records at Firebase once; per-merge work is just the Hosting redeploy.
