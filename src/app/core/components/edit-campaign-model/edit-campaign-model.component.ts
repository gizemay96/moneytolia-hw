import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { Campaign } from '../../models/compaign_model';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-edit-campaign-model',
  templateUrl: './edit-campaign-model.component.html',
  styleUrls: ['./edit-campaign-model.component.scss']
})
export class EditCampaignModelComponent {
  campaignEditForm: FormGroup;
  campaignData: Campaign;

  constructor(
    @Inject(MAT_DIALOG_DATA) public props: any,
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    private formBuilder: FormBuilder,
    private campaignService: CampaignsService

  ) {
    this.campaignData = this.props.campaign;
    this.campaignEditForm = this.formBuilder.group({
      title: [this.campaignData.title, [Validators.required]],
      description: [this.campaignData.description, [Validators.required]],
    });
  }

  editCampaign() {
    const data = { ...this.campaignData, ...this.campaignEditForm.value }
    this.campaignService.updateCampaing(data, this.props.index);
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
