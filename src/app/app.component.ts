import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Campaign } from './core/models/compaign_model';
import { AuthServiceService } from './services/auth.service';
import { CampaignsService } from './services/campaigns.service';
import { LocalstorageRefService } from './services/localstorage.service';

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
  initialCampaigns: Campaign[] = require('./core/data/init_campaigns.json');

  constructor(private authService: AuthServiceService, private campaignService: CampaignsService, private localStorage: LocalstorageRefService) {
    this.checkLocalStorage();
    this.authService.signOutEventFromLocalStorage$.subscribe(isLogined => !isLogined && this.authService.signOut());
    this.authService.setLoginData();
    this.campaignService.setCampaigns();
  }

  checkLocalStorage() {
    !this.localStorage.getData('campaignList') && this.localStorage.setData('campaignList', this.initialCampaigns);
  }

}
