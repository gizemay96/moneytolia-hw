import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from './services/auth.service';
import { CampaignsService } from './services/campaigns.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule
  ]
})
export class AppComponent {
  constructor(private authService: AuthServiceService , private campaignService: CampaignsService) {
    this.authService.signOutEventFromLocalStorage$.subscribe(isLogined => !isLogined && this.authService.signOut());
    this.authService.setLoginData();
    this.campaignService.setCampaigns();
  }
}
