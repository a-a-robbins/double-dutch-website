import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'coaches',
    loadComponent: () => import('./features/coaches/coaches.component').then(m => m.CoachesComponent)
  },
  {
    path: 'schedule',
    loadComponent: () => import('./features/schedule/schedule.component').then(m => m.ScheduleComponent)
  },
  {
    path: 'announcements',
    loadComponent: () => import('./features/announcements/announcements.component').then(m => m.AnnouncementsComponent)
  },
  {
    path: 'dress-code',
    loadComponent: () => import('./features/dress-code/dress-code.component').then(m => m.DressCodeComponent)
  },
  {
    path: 'pricing',
    loadComponent: () => import('./features/pricing/pricing.component').then(m => m.PricingComponent)
  },
  { path: '**', redirectTo: '' }
];
