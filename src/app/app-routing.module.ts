import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

  },
  {
    path: '',
    loadComponent: () => import('./segments/segments.component').then(m => m.SegmentsComponent),
    canMatch: [AuthGuard]
  },

  {
    path: 'state',
    loadChildren: () => import('./state/state.module').then(m => m.StateModule),
    canMatch: [AuthGuard]
  },
  {
    path: 'segments',
    loadComponent: () => import('./segments/segments.component').then(m => m.SegmentsComponent),
    canMatch: [AuthGuard]
  },
  {
    path: 'list-categories',
    loadComponent: () => import('./categories/list-categories/list-categories.component').then(m => m.ListCategoriesComponent),
    canMatch: [AuthGuard]
  },
  {
    path: 'rols',
    loadComponent: () => import('./auth/rols/rols.component').then(m => m.RolsComponent),
    canMatch: [AuthGuard]
  },
  {
    path: 'type-requests',
    loadComponent: () => import('./requests/type-requests/type-requests.component').then(m => m.TypeRequestsComponent),
    canMatch: [AuthGuard]
  },
  {
    path: 'requests',
    loadComponent: () => import('./requests/requests/requests.component').then(m => m.RequestsComponent),
    canMatch: [AuthGuard]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  //exports: [RouterModule]
})
export class AppRoutingModule { }
