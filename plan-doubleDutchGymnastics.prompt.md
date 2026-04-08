# Double Dutch Gymnastics: Angular Migration & Backend Integration Plan

Complete step-by-step guide for converting static website to Angular frontend with .NET Core + PostgreSQL (Supabase) backend.

---

## TABLE OF CONTENTS

1. [Phase 1: Angular Frontend Migration](#phase-1-angular-frontend-migration)
2. [Phase 2: .NET Backend & Supabase Integration](#phase-2-net-backend--supabase-integration)
3. [Project Structure](#project-structure)
4. [Deployment Guide](#deployment-guide)
5. [Troubleshooting](#troubleshooting)

---

# PHASE 1: ANGULAR FRONTEND MIGRATION

**Estimated Time: 2-3 days**
**Goal: Convert static HTML to dynamic Angular app with Bootstrap 5, maintaining all current functionality**

## Prerequisites

- Node.js v16+ installed ([nodejs.org](https://nodejs.org))
- Angular CLI: `npm install -g @angular/cli`
- Git installed (recommended)
- VS Code or IDE of choice

---

## SECTION 1: PROJECT SETUP & CONFIGURATION

### Step 1.1: Create Angular Project

Navigate to your projects directory and create the new Angular app:

```bash
cd C:\Users\darob\RiderProjects
ng new double-dutch-gymnastics --routing --style=css --skip-git=false
cd double-dutch-gymnastics
```

**Flags explained:**
- `--routing`: Automatically generates AppRoutingModule for multi-page navigation
- `--style=css`: Uses CSS (not SCSS) for simpler component styling
- `--skip-git`: Allows Git repo initialization

### Step 1.2: Install Dependencies

Install Bootstrap 5, ng-bootstrap, and Font Awesome:

```bash
npm install bootstrap ng-bootstrap
npm install @fortawesome/fontawesome-free
```

### Step 1.3: Configure Bootstrap & FontAwesome in angular.json

Open `angular.json` in your project root. Locate `projects > double-dutch-gymnastics > architect > build > options > styles` array and replace it with:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
  "src/styles.css"
],
```

Also add to `scripts` array:

```json
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

### Step 1.4: Update app.module.ts with ng-bootstrap

Replace contents of `src/app/app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 1.5: Test Initial Setup

```bash
ng serve
```

Navigate to `http://localhost:4200`. You should see the default Angular welcome screen.

---

## SECTION 2: CREATE DATA MODELS & SERVICES

### Step 2.1: Create Shared Directory Structure

```bash
# Create folders for models and services
mkdir src/app/shared/models
mkdir src/app/shared/services
mkdir src/app/shared/components
```

### Step 2.2: Create Data Models (Interfaces)

**File: `src/app/shared/models/coach.model.ts`**

```typescript
export interface Coach {
  id: number;
  name: string;
  title: string;
  bio: string;
  imagePath: string;
}
```

**File: `src/app/shared/models/class.model.ts`**

```typescript
export interface ClassOffering {
  id: number;
  name: string;
  ageRange: string;
  description: string;
  duration: string;
  imagePath: string;
  details: string[];
}
```

**File: `src/app/shared/models/announcement.model.ts`**

```typescript
export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: Date;
  imagePath?: string;
}
```

**File: `src/app/shared/models/schedule.model.ts`**

```typescript
export interface Schedule {
  id: number;
  title: string;
  imagePath: string;
  description?: string;
}
```

### Step 2.3: Create Data Service

Generate the service:

```bash
ng generate service shared/services/data --skip-tests
```

**File: `src/app/shared/services/data.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { Coach } from '../models/coach.model';
import { ClassOffering } from '../models/class.model';
import { Announcement } from '../models/announcement.model';
import { Schedule } from '../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  // ============ COACHES DATA ============
  getCoaches(): Coach[] {
    return [
      {
        id: 1,
        name: 'Attie Doak',
        title: 'HEAD COACH',
        imagePath: 'assets/DoubleDutch-Images/attie-profile.jpg',
        bio: `My love for gymnastics started at seven years old, I was determined to teach myself with the help from an amazing neighbor. The greatest gift for my 9th birthday was my mom signing me up for a gymnastics class and I was hooked!

I was a gymnast until 17 when I discovered my love for teaching others gymnastics. I've never looked back, teaching others gymnastics quickly became my passion. Teaching came pretty natural, I've always enjoyed being the 3rd of eight children who also homeschooled. So teaching others has also been an important part of my life as long as I can remember.

I started as a Junior Coach at 12 years old helping as many classes as I could. At 16, I became a coach of our competition team. At 18, I took on head coaching responsibilities for our competition team, including teaching routines, cleaning routines, travel, and being their cheerleader for every win or loss which was a valuable learning experience.

I've taught all ages from 18 months to 18 years both girls and boys. I've also done cheer clinics and love working with Cheerleaders to help improve flexibility, stunts and more. I find that teaching little gymnasts self confidence and that hard work, practice and discipline will help them develop the skills necessary for any challenge they face as they become young adults. Watching their confidence, work ethic and skills grow is what makes me love teaching gymnastics more and more everyday. I can't wait to teach and develop your little gymnast at Double Dutch Gymnastics!`
      },
      {
        id: 2,
        name: 'Gena Doak',
        title: 'ASSISTANT COACH',
        imagePath: 'assets/DoubleDutch-Images/gena-profile.jpeg',
        bio: `I started gymnastics at the age of four and continued over the past six years with my love for the sport. I homeschool daily with a focus on learning responsibility, my education, and of course, playing hard.

I also love music and singing. I participate in choir and take violin & piano lessons.

I enjoy the opportunity to teach others gymnastics skills safely while helping them to build their confidence in the sport as I continue to grow in the gymnastics community.`
      },
      {
        id: 3,
        name: 'Gib Doak',
        title: 'JUNIOR COACH ASSISTANT',
        imagePath: 'assets/DoubleDutch-Images/gib-profile.jpeg',
        bio: `I started gymnastics at the age of four and continued over the past six years with my love for the sport. I homeschool daily with a focus on learning responsibility, my education, and of course, playing hard.

I also love music and singing. I participate in choir and take violin & piano lessons.

I enjoy the opportunity to teach others gymnastics skills safely while helping them to build their confidence in the sport as I continue to grow in the gymnastics community.`
      },
      {
        id: 4,
        name: 'Ruth',
        title: 'MEET THE TEAM',
        imagePath: 'assets/DoubleDutch-Images/ruth-profile.jpeg',
        bio: `I am currently enjoying my freshman year in high school. I live on a farm and enjoy doing anything outdoors. I have 10 nieces and nephews, and love doing things with them. I've had an interest in gymnastics for as long as I can remember, and I'm excited to help your gymnasts!`
      }
    ];
  }

  // ============ CLASSES DATA ============
  getClasses(): ClassOffering[] {
    return [
      {
        id: 1,
        name: 'Mommy & Me',
        ageRange: 'Ages 18mo - 2.5 years',
        imagePath: 'assets/DoubleDutch-Images/4I6A3005.jpg',
        duration: '30 minutes',
        description: 'Fun-based program that encourages bonding between parent and child during their fundamental developing stage. These classes are entry level and fun, with the goal of practicing following along in a group activity. We expect your children to possibly cry, protest, and or throw a fit. It\'s all part of the process of learning a new skill. DDG is always a guilt free parent zone.',
        details: [
          '10 minute game and stretch',
          '20 minutes of structured rotations',
          'Bars, Beams, Tumbling',
          'Fine motor skills, grip strength, spatial awareness, body awareness'
        ]
      },
      {
        id: 2,
        name: 'Toddlers',
        ageRange: 'Ages 2.5 - 4.5 years',
        imagePath: 'assets/DoubleDutch-Images/toddler-bar.jpg',
        duration: '30 minutes',
        description: 'Fun-filled classes focused on learning in a safe and loving environment that is focused on learning how to be in a class and following in line. Along with the foundation of gymnastics!',
        details: [
          '10 minute game and stretch',
          '20 minutes of structured rotation',
          'Bars, beams, tumbling, climbing',
          'Fine motor skills, hand-eye coordination'
        ]
      },
      {
        id: 3,
        name: 'Kids',
        ageRange: 'Ages 4.5 - 6.5 years',
        imagePath: 'assets/DoubleDutch-Images/recreational.jpg',
        duration: '45 minutes',
        description: 'Fun-filled classes all about improvement! Your child will be encouraged to always try their best and strive to become better during every class.',
        details: [
          '10 minutes of warm up games and stretching',
          '35 minutes of structured rotations',
          'Vault, Bars, Beam, Tumbling'
        ]
      },
      {
        id: 4,
        name: 'Recreational',
        ageRange: 'Ages 6.5+',
        imagePath: 'assets/DoubleDutch-Images/4I6A2769.jpg',
        duration: '60 minutes',
        description: 'Fun-based classes all about success! Your child will be encouraged to succeed in everything they do, whether that takes a day or a year!',
        details: [
          '15 minutes of warm ups and stretching',
          '45 minutes of structured rotations and stations',
          'Vault, Bars, Beam, Tumbling'
        ]
      },
      {
        id: 5,
        name: 'Pre-Team',
        ageRange: 'Ages 5+',
        imagePath: 'assets/DoubleDutch-Images/kid-handstand.jpg',
        duration: '90 minutes',
        description: 'This program is not a team commitment but the step before the team commitment. Parents must inquire by emailing ddgymnastics23@gmail.com',
        details: [
          'Once weekly (may be twice weekly depending on skill level)',
          'Learning fundamentals of gymnastics',
          'Safety when falling, routine memorization',
          'Good attitudes and confidence building'
        ]
      }
    ];
  }

  // ============ ANNOUNCEMENTS DATA ============
  getAnnouncements(): Announcement[] {
    return [
      // Add announcements as they become available
    ];
  }

  // ============ SCHEDULES DATA ============
  getSchedules(): Schedule[] {
    return [
      {
        id: 1,
        title: 'Fall/Winter 2025 Schedule',
        imagePath: 'assets/fall-winter-2025.jpg',
        description: 'Current schedule for Fall and Winter sessions'
      },
      {
        id: 2,
        title: 'Summer 2025 Schedule',
        imagePath: 'assets/summer-25-schedule.jpg',
        description: 'Summer session schedule'
      }
    ];
  }
}
```

---

## SECTION 3: CREATE SHARED COMPONENTS

### Step 3.1: Generate Components

```bash
ng generate component shared/components/header --skip-tests
ng generate component shared/components/footer --skip-tests
```

### Step 3.2: Header Component

**File: `src/app/shared/components/header/header.component.ts`**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNavbarOpen = false;

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  closeNavbar(): void {
    this.isNavbarOpen = false;
  }
}
```

**File: `src/app/shared/components/header/header.component.html`**

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" routerLink="/" (click)="closeNavbar()">
      <img src="assets/logo.png" width="30" height="30" alt="Double Dutch Gymnastics Logo">
    </a>
    <button class="navbar-toggler" type="button" (click)="toggleNavbar()" 
            [class.collapsed]="!isNavbarOpen" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" [class.show]="isNavbarOpen">
      <div class="navbar-nav ms-auto">
        <a class="nav-link" routerLink="/announcements" routerLinkActive="active" 
           (click)="closeNavbar()">Announcements</a>
        <a class="nav-link" routerLink="/" fragment="classes" routerLinkActive="active"
           (click)="closeNavbar()">Classes</a>
        <a class="nav-link" routerLink="/coaches" routerLinkActive="active"
           (click)="closeNavbar()">Coaches</a>
        <a class="nav-link" routerLink="/dress-code" routerLinkActive="active"
           (click)="closeNavbar()">Dress Code</a>
        <a class="nav-link" routerLink="/schedule" routerLinkActive="active"
           (click)="closeNavbar()">Schedule</a>
        <a class="nav-link" href="https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=552895" 
           target="_blank">Parent Portal</a>
        <a class="nav-link" routerLink="/pricing" routerLinkActive="active"
           (click)="closeNavbar()">Pricing</a>
      </div>
    </div>
  </div>
</nav>
```

**File: `src/app/shared/components/header/header.component.css`**

```css
.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar-brand img {
  transition: transform 0.3s ease;
}

.navbar-brand:hover img {
  transform: scale(1.1);
}

.nav-link {
  font-weight: 500;
  margin-left: 0.5rem;
}

.nav-link:hover,
.nav-link.active {
  color: purple !important;
  text-decoration: underline;
}
```

### Step 3.3: Footer Component

**File: `src/app/shared/components/footer/footer.component.ts`**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
}
```

**File: `src/app/shared/components/footer/footer.component.html`**

```html
<footer class="footer mt-5 py-4 bg-light border-top">
  <div class="container">
    <div class="row">
      <!-- Contact Info Section -->
      <div class="col-md-6 mb-3 mb-md-0">
        <h4 class="mb-3">Double Dutch Gymnastics</h4>
        <div class="icons mb-3">
          <a href="https://www.facebook.com/profile.php?id=61550596560829" target="_blank"
             class="text-decoration-none text-dark me-3" title="Facebook">
            <i class="fab fa-facebook fa-2x"></i>
          </a>
          <a href="https://www.instagram.com/double_dutch_gymnastics" target="_blank"
             class="text-decoration-none text-dark me-3" title="Instagram">
            <i class="fab fa-instagram fa-2x"></i>
          </a>
          <a href="mailto:ddgymnastics23@gmail.com" target="_blank"
             class="text-decoration-none text-dark" title="Email">
            <i class="fas fa-envelope fa-2x"></i>
          </a>
        </div>
      </div>
      <!-- Links Section -->
      <div class="col-md-6">
        <ul class="list-unstyled">
          <li><a routerLink="/announcements" class="text-dark text-decoration-none">Announcements</a></li>
          <li><a routerLink="/" fragment="classes" class="text-dark text-decoration-none">Classes</a></li>
          <li><a routerLink="/coaches" class="text-dark text-decoration-none">Coaches</a></li>
          <li><a routerLink="/dress-code" class="text-dark text-decoration-none">Dress Code</a></li>
          <li><a routerLink="/schedule" class="text-dark text-decoration-none">Schedule</a></li>
          <li><a href="https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=552895"
                 class="text-dark text-decoration-none" target="_blank">Parent Portal</a></li>
          <li><a routerLink="/pricing" class="text-dark text-decoration-none">Pricing</a></li>
        </ul>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12 text-center">
        <p class="mb-0"><i class="far fa-copyright"></i> 2024 Web Wave Designs</p>
      </div>
    </div>
  </div>
</footer>
```

**File: `src/app/shared/components/footer/footer.component.css`**

```css
.footer {
  margin-top: auto;
}

.footer a:hover {
  color: purple !important;
  transition: color 0.3s ease;
}

.footer h4 {
  font-weight: 600;
  color: #333;
}

.footer ul li {
  margin-bottom: 0.5rem;
}
```

---

## SECTION 4: CREATE FEATURE MODULES & ROUTING

### Step 4.1: Generate Feature Modules

```bash
ng generate module features/home --routing --skip-tests
ng generate module features/coaches --routing --skip-tests
ng generate module features/schedule --routing --skip-tests
ng generate module features/announcements --routing --skip-tests
ng generate module features/dress-code --routing --skip-tests
ng generate module features/parent-info --routing --skip-tests
ng generate module features/pricing --routing --skip-tests
```

### Step 4.2: Generate Components

```bash
ng generate component features/home/home --skip-tests
ng generate component features/coaches/coaches-list --skip-tests
ng generate component features/coaches/coach-card --skip-tests
ng generate component features/schedule/schedule --skip-tests
ng generate component features/announcements/announcements --skip-tests
ng generate component features/dress-code/dress-code --skip-tests
ng generate component features/parent-info/parent-info --skip-tests
ng generate component features/pricing/pricing --skip-tests
```

### Step 4.3: Setup Main App Routing

**File: `src/app/app-routing.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'coaches',
    loadChildren: () => import('./features/coaches/coaches.module').then(m => m.CoachesModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./features/schedule/schedule.module').then(m => m.ScheduleModule)
  },
  {
    path: 'announcements',
    loadChildren: () => import('./features/announcements/announcements.module').then(m => m.AnnouncementsModule)
  },
  {
    path: 'dress-code',
    loadChildren: () => import('./features/dress-code/dress-code.module').then(m => m.DressCodeModule)
  },
  {
    path: 'parent-info',
    loadChildren: () => import('./features/parent-info/parent-info.module').then(m => m.ParentInfoModule)
  },
  {
    path: 'pricing',
    loadChildren: () => import('./features/pricing/pricing.module').then(m => m.PricingModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // Set to true for debugging
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

---

## SECTION 5: BUILD HOME PAGE

### Step 5.1: Home Component

**File: `src/app/features/home/home/home.component.ts`**

```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { ClassOffering } from '../../../shared/models/class.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  classes: ClassOffering[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.classes = this.dataService.getClasses();
  }
}
```

**File: `src/app/features/home/home/home.component.html`**

```html
<div class="container-fluid p-0">
  <!-- Hero Section -->
  <div class="hero-section" style="background-color: purple; padding: 3rem 1rem;">
    <div class="container">
      <h1 class="text-center text-white mb-4">Double Dutch Gymnastics</h1>
      <div class="text-center mb-4">
        <img src="assets/DoubleDutch-Images/team-bars-cropped.png" class="img-fluid" 
             alt="gymnasts balancing on bar" style="max-width: 500px; max-height: 300px;">
      </div>
      <p class="lead text-center text-white">
        At Double Dutch Gymnastics we believe in our athletes and want to help them meet all their goals!
      </p>
      <hr class="bg-white">
      <p class="text-center text-white">
        We have classes for youth of all ages and skill levels. From Littles to Kids to Teens and everyone in between, 
        let us help your child find their passion today!
      </p>
      <div class="text-center">
        <a class="btn btn-warning btn-lg mt-3" 
           href="https://app.jackrabbitclass.com/regv2.asp?id=552895"
           target="_blank" role="button">
          <i class="fas fa-search"></i> Find Class
        </a>
      </div>
    </div>
  </div>

  <!-- Classes Section -->
  <div class="container-fluid bg-light py-5">
    <div class="container">
      <h2 class="text-center text-dark mb-5 pb-3 border-bottom" id="classes">
        Our Classes
      </h2>

      <div *ngFor="let class of classes; let last = last" class="row align-items-center mb-5" 
           [class.border-bottom]="!last">
        <div class="col-lg-4 mb-4 mb-lg-0">
          <img [src]="class.imagePath" class="rounded img-fluid shadow-sm" 
               [alt]="class.name + ' gymnast'" loading="lazy">
        </div>
        <div class="col-lg-8 ps-lg-4">
          <h3 class="text-purple mb-2">{{ class.name }}</h3>
          <p class="mb-2"><strong>{{ class.ageRange }}</strong> • {{ class.duration }}</p>
          <p class="text-muted mb-3">{{ class.description }}</p>
          <ul class="list-unstyled">
            <li *ngFor="let detail of class.details" class="mb-2">
              <i class="fas fa-check text-success me-2"></i>{{ detail }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
```

**File: `src/app/features/home/home/home.component.css`**

```css
.hero-section {
  background-attachment: fixed;
  background-size: cover;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-section .lead {
  font-size: 1.3rem;
}

.text-purple {
  color: purple;
  font-weight: 600;
}

.img-fluid {
  transition: transform 0.3s ease;
}

.img-fluid:hover {
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .hero-section .lead {
    font-size: 1rem;
  }

  .ps-lg-4 {
    padding-left: 0 !important;
  }
}
```

### Step 5.2: Home Module Setup

**File: `src/app/features/home/home-routing.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
```

**File: `src/app/features/home/home.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
```

---

## SECTION 6: BUILD COACHES PAGE

### Step 6.1: Coach Card Component

**File: `src/app/features/coaches/coach-card/coach-card.component.ts`**

```typescript
import { Component, Input } from '@angular/core';
import { Coach } from '../../../shared/models/coach.model';

@Component({
  selector: 'app-coach-card',
  templateUrl: './coach-card.component.html',
  styleUrls: ['./coach-card.component.css']
})
export class CoachCardComponent {
  @Input() coach!: Coach;
}
```

**File: `src/app/features/coaches/coach-card/coach-card.component.html`**

```html
<div class="card h-100 shadow-sm">
  <div class="card-header text-white" style="background-color: purple;">
    <h5 class="card-title mb-0">{{ coach.title }}</h5>
    <h4 class="mb-0">{{ coach.name }}</h4>
  </div>
  <div class="card-body d-flex flex-column align-items-center">
    <img class="coach-image mb-3 rounded" [src]="coach.imagePath" [alt]="coach.name">
    <p class="card-text text-start" [innerText]="coach.bio"></p>
  </div>
</div>
```

**File: `src/app/features/coaches/coach-card/coach-card.component.css`**

```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15) !important;
}

.card-header {
  padding: 1.25rem;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-header h4 {
  font-size: 1.3rem;
  font-weight: 700;
}

.coach-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 3px solid purple;
}

.card-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
}
```

### Step 6.2: Coaches List Component

**File: `src/app/features/coaches/coaches-list/coaches-list.component.ts`**

```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Coach } from '../../../shared/models/coach.model';

@Component({
  selector: 'app-coaches-list',
  templateUrl: './coaches-list.component.html',
  styleUrls: ['./coaches-list.component.css']
})
export class CoachesListComponent implements OnInit {
  coaches: Coach[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.coaches = this.dataService.getCoaches();
  }
}
```

**File: `src/app/features/coaches/coaches-list/coaches-list.component.html`**

```html
<div class="container py-5">
  <div class="row mb-5">
    <div class="col-12">
      <h1 class="text-center mb-3">Meet Our Coaches</h1>
      <p class="text-center text-muted">Dedicated professionals passionate about gymnastics education</p>
    </div>
  </div>

  <div class="row g-4">
    <div class="col-lg-6 mb-4" *ngFor="let coach of coaches">
      <app-coach-card [coach]="coach"></app-coach-card>
    </div>
  </div>
</div>
```

### Step 6.3: Coaches Module

**File: `src/app/features/coaches/coaches-routing.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachesListComponent } from './coaches-list/coaches-list.component';

const routes: Routes = [
  {
    path: '',
    component: CoachesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachesRoutingModule { }
```

**File: `src/app/features/coaches/coaches.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachesRoutingModule } from './coaches-routing.module';
import { CoachesListComponent } from './coaches-list/coaches-list.component';
import { CoachCardComponent } from './coach-card/coach-card.component';

@NgModule({
  declarations: [
    CoachesListComponent,
    CoachCardComponent
  ],
  imports: [
    CommonModule,
    CoachesRoutingModule
  ]
})
export class CoachesModule { }
```

---

## SECTION 7: BUILD REMAINING PAGES

### Step 7.1: Schedule Page

**File: `src/app/features/schedule/schedule/schedule.component.ts`**

```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Schedule } from '../../../shared/models/schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedules: Schedule[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.schedules = this.dataService.getSchedules();
  }
}
```

**File: `src/app/features/schedule/schedule/schedule.component.html`**

```html
<div class="container py-5">
  <h1 class="text-center mb-5">Class Schedules</h1>

  <div class="row">
    <div class="col-lg-6 mb-4" *ngFor="let schedule of schedules">
      <div class="card shadow-sm h-100">
        <img [src]="schedule.imagePath" class="card-img-top" [alt]="schedule.title" loading="lazy">
        <div class="card-body">
          <h5 class="card-title">{{ schedule.title }}</h5>
          <p class="card-text text-muted">{{ schedule.description }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-5">
    <div class="col-12">
      <div class="alert alert-info">
        <h5 class="alert-heading">Need More Information?</h5>
        <p>For detailed schedule information or to register for classes, visit our <a href="https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=552895" target="_blank" class="alert-link">Parent Portal</a>.</p>
      </div>
    </div>
  </div>
</div>
```

**File: `src/app/features/schedule/schedule/schedule.component.css`**

```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15) !important;
}

.card-img-top {
  height: 300px;
  object-fit: cover;
}
```

**File: `src/app/features/schedule/schedule-routing.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
```

**File: `src/app/features/schedule/schedule.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
```

### Step 7.2: Announcements Page

**File: `src/app/features/announcements/announcements/announcements.component.ts`**

```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Announcement } from '../../../shared/models/announcement.model';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  announcements: Announcement[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.announcements = this.dataService.getAnnouncements();
  }
}
```

**File: `src/app/features/announcements/announcements/announcements.component.html`**

```html
<div class="container py-5">
  <h1 class="text-center mb-5">Announcements</h1>

  <div *ngIf="announcements.length === 0" class="alert alert-info">
    <p class="mb-0">No announcements at this time. Check back soon!</p>
  </div>

  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div *ngFor="let announcement of announcements" class="card mb-4 shadow-sm">
        <img *ngIf="announcement.imagePath" [src]="announcement.imagePath" class="card-img-top" [alt]="announcement.title">
        <div class="card-body">
          <h5 class="card-title">{{ announcement.title }}</h5>
          <p class="card-text small text-muted">{{ announcement.date | date: 'MMM d, yyyy' }}</p>
          <p class="card-text">{{ announcement.content }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Step 7.3: Dress Code Page

**File: `src/app/features/dress-code/dress-code/dress-code.component.ts`**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-dress-code',
  templateUrl: './dress-code.component.html',
  styleUrls: ['./dress-code.component.css']
})
export class DressCodeComponent {
  girlsDressCode = [
    'Any fitted leotard or tank top',
    'Spandex/fitted shorts or leggings',
    'No watches, bulky jewelry, dangle earrings, etc.'
  ];

  boysDressCode = [
    'Tight fitting shirts',
    'Fitted shorts or pants without buttons',
    'No watches, bulky jewelry, dangle earrings, etc.'
  ];

  hairGuidelines = [
    'All athletes hair should be pulled away from face at all times during class',
    'Hair must be secured in a placement that allows safe execution of rolls',
    'No bulky buns (causes athlete pain during rolls)',
    'Hair tie charge applied if child does not comply consistently'
  ];
}
```

**File: `src/app/features/dress-code/dress-code/dress-code.component.html`**

```html
<div class="container py-5">
  <h1 class="text-center mb-5">Dress Code</h1>

  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <!-- Girls Section -->
      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-info text-white">
          <h4 class="mb-0"><i class="fas fa-girl me-2"></i> Girls</h4>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" *ngFor="let item of girlsDressCode">
              <i class="fas fa-check text-success me-2"></i>{{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Boys Section -->
      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0"><i class="fas fa-boy me-2"></i> Boys</h4>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" *ngFor="let item of boysDressCode">
              <i class="fas fa-check text-success me-2"></i>{{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Hair Guidelines Section -->
      <div class="card shadow-sm">
        <div class="card-header bg-warning">
          <h4 class="mb-0"><i class="fas fa-redo me-2"></i> Hair Guidelines</h4>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" *ngFor="let item of hairGuidelines">
              <i class="fas fa-star text-warning me-2"></i>{{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Step 7.4: Parent Info & Pricing Pages

Create these similarly with static content. Examples:

**File: `src/app/features/parent-info/parent-info/parent-info.component.html`** (Summary)

```html
<div class="container py-5">
  <h1 class="text-center mb-5">Parent Information</h1>

  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-success text-white">
          <h5 class="mb-0">Our Goals</h5>
        </div>
        <div class="card-body">
          <p>Our goal is to help your children grow in the sport of gymnastics in the most loving and nurturing way. 
             Gymnastics is the basis for so many sports.</p>
          <p>We teach children with respect and encouragement, empowering them not only in gymnastics but in every 
             aspect of their lives.</p>
        </div>
      </div>

      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-warning">
          <h5 class="mb-0">Contact Us</h5>
        </div>
        <div class="card-body">
          <p><strong>Email:</strong> <a href="mailto:ddgymnastics23@gmail.com">ddgymnastics23@gmail.com</a></p>
          <p><strong>Facebook:</strong> <a href="https://www.facebook.com/profile.php?id=61550596560829" target="_blank">@doubledutchgymnastics</a></p>
          <p><strong>Instagram:</strong> <a href="https://www.instagram.com/double_dutch_gymnastics" target="_blank">@double_dutch_gymnastics</a></p>
        </div>
      </div>

      <div class="alert alert-primary">
        <h5 class="alert-heading">Weather Policy</h5>
        <p class="mb-2">If school in Pella has a 2 hour delay due to winter weather, we will not have morning classes.</p>
        <p class="mb-0">If school in Pella is cancelled or dismissed early due to winter weather, we will not have evening classes.</p>
      </div>
    </div>
  </div>
</div>
```

**File: `src/app/features/pricing/pricing/pricing.component.html`** (Summary)

```html
<div class="container py-5">
  <h1 class="text-center mb-5">Pricing</h1>

  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="alert alert-info">
        <h5 class="alert-heading">Pricing Information</h5>
        <p>For detailed pricing information and registration, please visit the <a href="https://app.jackrabbitclass.com/regv2.asp?id=552895" target="_blank" class="alert-link">JackRabbit Class Portal</a>.</p>
      </div>

      <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">Payment Information</h5>
        </div>
        <div class="card-body">
          <ul class="list-unstyled">
            <li class="mb-3"><i class="fas fa-check text-success me-2"></i>Monthly fees due the first class period of each month</li>
            <li class="mb-3"><i class="fas fa-check text-success me-2"></i>Easy payment through JackRabbit Parent Portal</li>
            <li class="mb-3"><i class="fas fa-check text-success me-2"></i>Cash and check accepted</li>
            <li><i class="fas fa-check text-success me-2"></i>JackRabbit account required for all families</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## SECTION 8: UPDATE APP COMPONENT

**File: `src/app/app.component.ts`**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Double Dutch Gymnastics';
}
```

**File: `src/app/app.component.html`**

```html
<div class="d-flex flex-column min-vh-100">
  <app-header></app-header>
  <main class="flex-grow-1">
    <router-outlet></router-outlet>
  </main>
  <app-footer></app-footer>
</div>
```

**File: `src/app/app.component.css`**

```css
:host {
  display: block;
}

main {
  flex-grow: 1;
}

.min-vh-100 {
  min-height: 100vh;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.flex-grow-1 {
  flex-grow: 1;
}
```

---

## SECTION 9: GLOBAL STYLES

**File: `src/styles.css`**

```css
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  color: #333;
}

body {
  margin: 0;
  padding: 0;
}

/* Color Scheme */
:root {
  --primary-color: #800080;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  color: #333;
  font-weight: 600;
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

/* Links */
a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--secondary-color);
  text-decoration: underline;
}

/* Buttons */
.btn {
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: #600060;
  border-color: #600060;
}

/* Cards */
.card {
  border: none;
  border-radius: 0.5rem;
}

/* Images */
img {
  max-width: 100%;
  height: auto;
}

/* Responsive */
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .container {
    padding: 1rem;
  }
}

/* Accessibility */
:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}
```

---

## SECTION 10: COPY ASSETS

From your Windows command line:

```bash
# Navigate to old project directory
cd C:\Users\darob\RiderProjects\double-dutch-website\src\assets

# Copy all assets to new Angular project (from the new project root)
xcopy "C:\Users\darob\RiderProjects\double-dutch-website\src\assets\*" "C:\Users\darob\RiderProjects\double-dutch-gymnastics\src\assets\" /E /I /Y
```

---

## SECTION 11: TEST LOCALLY

### Step 11.1: Start Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200` and test:
- All navigation links work
- All pages display correctly
- Images load properly
- Responsive design works on mobile/tablet
- Footer sticks to bottom

### Step 11.2: Build for Production

```bash
ng build --configuration production
```

Output will be in `dist/double-dutch-gymnastics/`

---

## SECTION 12: DEPLOYMENT (PHASE 1 COMPLETE)

### Option A: Netlify (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial Angular conversion"
   git push -u origin main
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub repo
   - Build command: `npm run build`
   - Publish directory: `dist/double-dutch-gymnastics`
   - Click Deploy

3. **Custom Domain:**
   - In Netlify: Domain settings → Add custom domain
   - Point CNAME to Netlify

### Option B: Vercel

1. Push to GitHub (same as above)
2. Go to [vercel.com](https://vercel.com)
3. Import GitHub repo
4. Vercel auto-detects Angular framework
5. Deploy!

### Option C: GitHub Pages

```bash
npm install -g angular-cli-ghpages
ng build --configuration production --base-href=/double-dutch-website/
ngh --dir=dist/double-dutch-gymnastics --branch=gh-pages
```

---

---

# PHASE 2: .NET BACKEND & SUPABASE INTEGRATION

**Estimated Time: 3-4 days**
**Goal: Add backend API, PostgreSQL database, OAuth authentication, and admin dashboard**

## Overview

In Phase 2, you'll:
1. Set up Supabase project with PostgreSQL database
2. Create .NET Core Web API
3. Implement database access with Entity Framework Core
4. Add OAuth authentication
5. Build admin dashboard in Angular

---

## SECTION A: SUPABASE SETUP

### Step A.1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with Google, GitHub, or email
4. Create new project:
   - Project name: `double-dutch-gymnastics`
   - Database password: Generate strong password and save it
   - Region: Choose closest to you
   - Click "Create new project"

### Step A.2: Get Connection Strings

Once project is created:

1. Go to "Settings" → "Database"
2. Copy connection string (JDBC or PostgreSQL)
3. Save for .NET configuration

Example connection string format:
```
postgresql://postgres:[PASSWORD]@db.xyz.supabase.co:5432/postgres
```

### Step A.3: Create Database Tables

In Supabase SQL Editor, run:

```sql
-- Coaches Table
CREATE TABLE coaches (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT,
  image_path VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes Table
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age_range VARCHAR(255),
  description TEXT,
  duration VARCHAR(50),
  image_path VARCHAR(500),
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Schedules Table
CREATE TABLE schedules (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_path VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Announcements Table
CREATE TABLE announcements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_path VARCHAR(500),
  published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_coaches_name ON coaches(name);
CREATE INDEX idx_classes_age_range ON classes(age_range);
CREATE INDEX idx_announcements_date ON announcements(published_date);
```

### Step A.4: Configure Supabase Auth

1. Go to "Authentication" → "Providers"
2. Enable Google OAuth:
   - Click "Google"
   - Paste Google OAuth credentials (get from Google Cloud Console)
3. Enable GitHub OAuth (similar process)

---

## SECTION B: CREATE .NET CORE WEB API

### Step B.1: Create .NET Project

```bash
# Create new directory for API
mkdir C:\Users\darob\RiderProjects\double-dutch-api
cd C:\Users\darob\RiderProjects\double-dutch-api

# Create .NET Core Web API project
dotnet new webapi -n DoubleDutchAPI
cd DoubleDutchAPI
```

### Step B.2: Install NuGet Packages

```bash
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Microsoft.AspNetCore.Cors
dotnet add package Supabase.Core
```

### Step B.3: Create Data Models

**File: `Models/Coach.cs`**

```csharp
namespace DoubleDutchAPI.Models
{
    public class Coach
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Bio { get; set; }
        public string ImagePath { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
```

**File: `Models/ClassOffering.cs`**

```csharp
using System.Collections.Generic;

namespace DoubleDutchAPI.Models
{
    public class ClassOffering
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AgeRange { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public string ImagePath { get; set; }
        public List<string> Details { get; set; } = new List<string>();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
```

**File: `Models/Schedule.cs`**

```csharp
namespace DoubleDutchAPI.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImagePath { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
```

**File: `Models/Announcement.cs`**

```csharp
namespace DoubleDutchAPI.Models
{
    public class Announcement
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImagePath { get; set; }
        public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
```

### Step B.4: Create DbContext

**File: `Data/ApplicationDbContext.cs`**

```csharp
using Microsoft.EntityFrameworkCore;
using DoubleDutchAPI.Models;

namespace DoubleDutchAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Coach> Coaches { get; set; }
        public DbSet<ClassOffering> Classes { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Announcement> Announcements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure table names
            modelBuilder.Entity<ClassOffering>().ToTable("classes");
            
            // Add indexes
            modelBuilder.Entity<Coach>().HasIndex(c => c.Name);
            modelBuilder.Entity<ClassOffering>().HasIndex(c => c.AgeRange);
            modelBuilder.Entity<Announcement>().HasIndex(a => a.PublishedDate);
        }
    }
}
```

### Step B.5: Configure Startup

**File: `appsettings.json`**

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Host=db.xyz.supabase.co;Port=5432;Database=postgres;Username=postgres;Password=YOUR_PASSWORD"
  },
  "Jwt": {
    "Key": "your-super-secret-key-min-32-characters-long",
    "Issuer": "double-dutch-api",
    "Audience": "double-dutch-app"
  }
}
```

**File: `Program.cs`**

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using DoubleDutchAPI.Data;
using System.Text;

var builder = WebApplicationBuilder.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Add Authentication
var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### Step B.6: Create API Controllers

**File: `Controllers/CoachesController.cs`**

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DoubleDutchAPI.Data;
using DoubleDutchAPI.Models;

namespace DoubleDutchAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoachesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoachesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coach>>> GetCoaches()
        {
            return await _context.Coaches.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Coach>> GetCoach(int id)
        {
            var coach = await _context.Coaches.FindAsync(id);
            if (coach == null)
                return NotFound();
            return coach;
        }

        [HttpPost]
        public async Task<ActionResult<Coach>> CreateCoach(Coach coach)
        {
            _context.Coaches.Add(coach);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCoach), new { id = coach.Id }, coach);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCoach(int id, Coach coach)
        {
            if (id != coach.Id)
                return BadRequest();

            _context.Entry(coach).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoach(int id)
        {
            var coach = await _context.Coaches.FindAsync(id);
            if (coach == null)
                return NotFound();

            _context.Coaches.Remove(coach);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
```

(Create similar controllers for Classes, Schedules, Announcements)

### Step B.7: Create Database Migrations

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Step B.8: Test API Locally

```bash
dotnet run
```

API will be available at `https://localhost:5001`

Swagger docs at `https://localhost:5001/swagger`

---

## SECTION C: CONNECT ANGULAR TO .NET API

### Step C.1: Update Angular HttpClient Service

**File: `src/app/shared/services/api.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coach } from '../models/coach.model';
import { ClassOffering } from '../models/class.model';
import { Schedule } from '../models/schedule.model';
import { Announcement } from '../models/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:5001/api'; // Update with actual API URL

  constructor(private http: HttpClient) { }

  // Coaches
  getCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(`${this.apiUrl}/coaches`);
  }

  getCoach(id: number): Observable<Coach> {
    return this.http.get<Coach>(`${this.apiUrl}/coaches/${id}`);
  }

  createCoach(coach: Coach): Observable<Coach> {
    return this.http.post<Coach>(`${this.apiUrl}/coaches`, coach);
  }

  updateCoach(id: number, coach: Coach): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/coaches/${id}`, coach);
  }

  deleteCoach(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/coaches/${id}`);
  }

  // Classes
  getClasses(): Observable<ClassOffering[]> {
    return this.http.get<ClassOffering[]>(`${this.apiUrl}/classes`);
  }

  // Schedules
  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}/schedules`);
  }

  // Announcements
  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.apiUrl}/announcements`);
  }

  createAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(`${this.apiUrl}/announcements`, announcement);
  }
}
```

### Step C.2: Add HttpClientModule to App

**File: `src/app/app.module.ts`** (Add to imports)

```typescript
import { HttpClientModule } from '@angular/common/http';

imports: [
  BrowserModule,
  AppRoutingModule,
  NgbModule,
  HttpClientModule  // Add this
]
```

### Step C.3: Update Components to Use API

**File: `src/app/features/coaches/coaches-list/coaches-list.component.ts`**

```typescript
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Coach } from '../../../shared/models/coach.model';

@Component({
  selector: 'app-coaches-list',
  templateUrl: './coaches-list.component.html',
  styleUrls: ['./coaches-list.component.css']
})
export class CoachesListComponent implements OnInit {
  coaches: Coach[] = [];
  loading = true;
  error: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCoaches();
  }

  loadCoaches(): void {
    this.apiService.getCoaches().subscribe({
      next: (data) => {
        this.coaches = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading coaches:', err);
        this.error = 'Failed to load coaches';
        this.loading = false;
      }
    });
  }
}
```

---

## SECTION D: BUILD ADMIN DASHBOARD

### Step D.1: Generate Admin Module

```bash
ng generate module features/admin --routing --skip-tests
ng generate component features/admin/admin-dashboard --skip-tests
ng generate component features/admin/manage-coaches --skip-tests
ng generate component features/admin/manage-schedules --skip-tests
ng generate component features/admin/manage-announcements --skip-tests
```

### Step D.2: Add Admin Routes

Update `src/app/app-routing.module.ts`:

```typescript
{
  path: 'admin',
  loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
}
```

### Step D.3: Create Admin Dashboard Component

**File: `src/app/features/admin/admin-dashboard/admin-dashboard.component.html`**

```html
<div class="container-fluid py-4">
  <div class="row mb-4">
    <div class="col-12">
      <h1>Admin Dashboard</h1>
      <button (click)="logout()" class="btn btn-danger">Logout</button>
    </div>
  </div>

  <div class="row">
    <div class="col-md-3 mb-4">
      <div class="card text-center shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Manage Coaches</h5>
          <p class="card-text">Edit coach profiles</p>
          <a routerLink="coaches" class="btn btn-primary">Go</a>
        </div>
      </div>
    </div>
    <div class="col-md-3 mb-4">
      <div class="card text-center shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Manage Schedules</h5>
          <p class="card-text">Update class schedules</p>
          <a routerLink="schedules" class="btn btn-primary">Go</a>
        </div>
      </div>
    </div>
    <div class="col-md-3 mb-4">
      <div class="card text-center shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Manage Announcements</h5>
          <p class="card-text">Create and edit announcements</p>
          <a routerLink="announcements" class="btn btn-primary">Go</a>
        </div>
      </div>
    </div>
  </div>

  <router-outlet></router-outlet>
</div>
```

### Step D.4: Manage Coaches Component

**File: `src/app/features/admin/manage-coaches/manage-coaches.component.ts`**

```typescript
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Coach } from '../../../shared/models/coach.model';

@Component({
  selector: 'app-manage-coaches',
  templateUrl: './manage-coaches.component.html',
  styleUrls: ['./manage-coaches.component.css']
})
export class ManageCoachesComponent implements OnInit {
  coaches: Coach[] = [];
  newCoach: Coach = { id: 0, name: '', title: '', bio: '', imagePath: '' };
  editingId: number | null = null;
  loading = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCoaches();
  }

  loadCoaches(): void {
    this.apiService.getCoaches().subscribe({
      next: (data) => {
        this.coaches = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading coaches:', err);
        this.loading = false;
      }
    });
  }

  saveCoach(): void {
    if (this.editingId) {
      this.apiService.updateCoach(this.editingId, this.newCoach).subscribe({
        next: () => {
          this.loadCoaches();
          this.resetForm();
        },
        error: (err) => console.error('Error updating coach:', err)
      });
    } else {
      this.apiService.createCoach(this.newCoach).subscribe({
        next: () => {
          this.loadCoaches();
          this.resetForm();
        },
        error: (err) => console.error('Error creating coach:', err)
      });
    }
  }

  editCoach(coach: Coach): void {
    this.newCoach = { ...coach };
    this.editingId = coach.id;
  }

  deleteCoach(id: number): void {
    if (confirm('Are you sure?')) {
      this.apiService.deleteCoach(id).subscribe({
        next: () => this.loadCoaches(),
        error: (err) => console.error('Error deleting coach:', err)
      });
    }
  }

  resetForm(): void {
    this.newCoach = { id: 0, name: '', title: '', bio: '', imagePath: '' };
    this.editingId = null;
  }
}
```

**File: `src/app/features/admin/manage-coaches/manage-coaches.component.html`**

```html
<div class="container mt-4">
  <h2>Manage Coaches</h2>

  <form (ngSubmit)="saveCoach()" class="card p-4 mb-4 shadow-sm">
    <div class="mb-3">
      <label class="form-label">Name</label>
      <input [(ngModel)]="newCoach.name" name="name" type="text" class="form-control" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Title</label>
      <input [(ngModel)]="newCoach.title" name="title" type="text" class="form-control" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Bio</label>
      <textarea [(ngModel)]="newCoach.bio" name="bio" class="form-control" rows="5"></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Image Path</label>
      <input [(ngModel)]="newCoach.imagePath" name="imagePath" type="text" class="form-control">
    </div>
    <button type="submit" class="btn btn-success">{{ editingId ? 'Update' : 'Create' }} Coach</button>
    <button type="button" (click)="resetForm()" class="btn btn-secondary ms-2">Cancel</button>
  </form>

  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Bio Preview</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let coach of coaches">
          <td>{{ coach.name }}</td>
          <td>{{ coach.title }}</td>
          <td>{{ coach.bio?.substring(0, 50) }}...</td>
          <td>
            <button (click)="editCoach(coach)" class="btn btn-sm btn-primary">Edit</button>
            <button (click)="deleteCoach(coach.id)" class="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

---

## SECTION E: DEPLOYMENT (PHASE 2)

### Deploy .NET API to Railway

1. Push .NET project to GitHub
2. Go to [railway.app](https://railway.app)
3. Connect GitHub
4. New project → Deploy from GitHub repo
5. Add PostgreSQL plugin
6. Configure environment variables from `appsettings.json`
7. Railway auto-deploys on git push

### Deploy Updated Angular App

```bash
ng build --configuration production
ng deploy  # If using GitHub Pages
# OR use Netlify/Vercel as before
```

Update API URL in `api.service.ts` to Railway domain.

---

## PROJECT STRUCTURE (COMPLETE)

```
double-dutch-gymnastics/
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   ├── home/
│   │   │   ├── coaches/
│   │   │   ├── schedule/
│   │   │   ├── announcements/
│   │   │   ├── dress-code/
│   │   │   ├── parent-info/
│   │   │   ├── pricing/
│   │   │   └── admin/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   └── footer/
│   │   │   ├── models/
│   │   │   └── services/
│   │   │       ├── data.service.ts
│   │   │       └── api.service.ts
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   ├── assets/
│   └── styles.css

double-dutch-api/
├── Controllers/
├── Models/
├── Data/
├── appsettings.json
└── Program.cs
```

---

## TROUBLESHOOTING

### Angular Issues

**Images not loading:**
- Verify path format: `assets/image-name.jpg`
- Check browser DevTools Network tab
- Ensure images exist in `src/assets`

**Routing not working:**
- Confirm RouterModule is imported
- Check route paths match routerLink values
- Use `ng serve` with `--open` flag

**Bootstrap not applying:**
- Rebuild after `angular.json` changes: `ng serve --poll=2000`
- Clear node_modules: `rm -r node_modules && npm install`

### API Issues

**CORS errors:**
- Verify CORS policy in `Program.cs`
- Check API URL in `api.service.ts` matches running API

**Database connection failed:**
- Verify Supabase connection string
- Confirm firewall allows PostgreSQL port 5432
- Check `.env` or `appsettings.json` credentials

**Migrations not applying:**
```bash
dotnet ef migrations add [MigrationName]
dotnet ef database update
```

---

## NEXT STEPS (Future Enhancements)

1. **Image Upload to Supabase Storage**
   - Add file upload forms
   - Use Supabase Storage client library

2. **Email Notifications**
   - Send emails on new announcements
   - Integration with SendGrid or Mailgun

3. **Payment Integration**
   - Integrate with Stripe for payments
   - Track registrations and classes

4. **Mobile App**
   - Build React Native or Flutter app
   - Share API with web and mobile

5. **Advanced Admin**
   - Drag-and-drop schedule builder
   - Batch photo uploads
   - Analytics dashboard

---

## RESOURCES

- [Angular Documentation](https://angular.io/docs)
- [.NET Core Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [Supabase Documentation](https://supabase.com/docs)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/)
- [Railway Deployment](https://railway.app/docs)
- [Netlify Deployment](https://docs.netlify.com/)

---

**Plan Complete! You now have a comprehensive roadmap for modernizing the Double Dutch Gymnastics website.**

