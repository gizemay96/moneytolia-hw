import { inject } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { tap } from "rxjs";
import { AuthServiceService } from "./services/auth.service";

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import("../app/pages/login/login.component")
  },
  {
    path: 'dashboard',
    loadComponent: () => import("../app/pages/dashboard/dashboard.component"),
    canActivate: [
      () => {
        const router = inject(Router); const authService = inject(AuthServiceService);
        return authService._isLogined$.pipe(tap(value => { return !value ? router.navigate(['/']) : true })).subscribe();
      }
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'campaigns'
      },
      {
        path: 'campaigns',
        loadComponent: () => import("../app/pages/dashboard/campaigns/campaigns.component"),
      },
      {
        path: 'create-campaign',
        loadComponent: () => import("../app/pages/dashboard/create-campaigns/create-campaigns.component"),
      },
    ],
  }
]