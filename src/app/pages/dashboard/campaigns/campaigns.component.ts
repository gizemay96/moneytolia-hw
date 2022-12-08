import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Campaign } from 'src/app/core/models/compaign_model';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component';
import { EditCampaignModelComponent } from 'src/app/core/components/edit-campaign-model/edit-campaign-model.component';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
  standalone: true,
  imports:  [
    MatMenuModule,
    CommonModule,
    MatDialogModule
  ]
})
export default class CampaignsComponent {
  campaignList$ = this.campaignService.campaignListObs$;

  constructor(private campaignService: CampaignsService, public dialog: MatDialog) {}

  deleteCampaign(index: number) {
    const message = 'Kampanyayı silmek istediğine emin misin ?';
    const data = { panelClass: 'modal-smc', data: {message ,  imgPath: "assets/icons/trash.png"} };
    const dialogRef = this.dialog.open(ConfirmationModalComponent, data);
    dialogRef.afterClosed().subscribe(answer => {
      if (answer.isYes) { this.campaignService.deleteCampaign(index) }
    });
  }

  editCampaign(campaign: Campaign , index: number) {
    const data = { panelClass: 'modal-smc', data: {campaign , index} };
    this.dialog.open(EditCampaignModelComponent, data);
  }

  updateCampaignScore(actionType: string, campaign: Campaign, ind: number) {
    const data = this.deepCopy(campaign);
    data.score = actionType === 'increment' ? campaign.score + 1 : campaign.score - 1;
    this.campaignService.updateCampaing(data, ind);
  }

  deepCopy(data: Campaign) {
    return JSON.parse(JSON.stringify(data));
  }

}
