import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { Campaign } from '../../models/compaign_model';
import { WhiteSpaceValidator } from '../../validators/whiteSpace.validator';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';


@Component({
  selector: 'app-edit-campaign-model',
  templateUrl: './edit-campaign-model.component.html',
  styleUrls: ['./edit-campaign-model.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
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
      title: [this.campaignData.title, [Validators.required, Validators.maxLength(55) , WhiteSpaceValidator]],
      description: [this.campaignData.description, [Validators.required , WhiteSpaceValidator]],
    });
  }

  editCampaign() {
    if (this.campaignEditForm.valid) {
      const data = { ...this.campaignData, ...this.campaignEditForm.value }
      this.campaignService.updateCampaing(data, this.props.index);
      this.closeModal();
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
