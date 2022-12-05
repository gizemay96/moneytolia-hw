import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsComponent } from './pages/dashboard/campaigns/campaigns.component';
import { CreateCampaignsComponent } from './pages/dashboard/create-campaigns/create-campaigns.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent ,
  children: [
    {
      path: 'campaigns',
      component: CampaignsComponent,
    },
    {
      path: 'create-campaign',
      component: CreateCampaignsComponent,
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
