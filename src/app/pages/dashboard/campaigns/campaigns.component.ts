import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component';
import { EditCampaignModelComponent } from 'src/app/core/components/edit-campaign-model/edit-campaign-model.component';
import { Campaign } from 'src/app/core/models/compaign_model';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { CampaignsService } from 'src/app/services/compaigns-service/compaigns-service.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent {
  campaignList: Campaign[] = [];

  constructor(public commonService: CommonServiceService, private campaignService: CampaignsService, public dialog: MatDialog,) { }

  ngOnInit() {
    this.getCampaigns();
  }

  async getCampaigns() {
    const response = await firstValueFrom(this.campaignService.getCampaingList());
    this.campaignList = response;
  }

  confirmationModal(campaign: Campaign) {
    const message = 'Kampanyayı silmek istediğine emin misin ?';
    const data = { panelClass: 'modal-smc', data: message };
    const dialogRef = this.dialog.open(ConfirmationModalComponent, data);
    dialogRef.afterClosed().subscribe(answer => {
      if (answer.isYes) { this.deleteCampaign(campaign) }
    });
  }

  async deleteCampaign(campaign: Campaign) {
    const response = await firstValueFrom(this.campaignService.deleteCampaign(campaign));
    if (response) { this.getCampaigns() }
  }

  editCampaign(campaign: Campaign) {
    const data = { panelClass: 'modal-smc', data: campaign };
    const dialogRef = this.dialog.open(EditCampaignModelComponent, data);
    dialogRef.afterClosed().subscribe(answer => {
      if (answer.isYes) { this.deleteCampaign(campaign) }
    });
  }

}
