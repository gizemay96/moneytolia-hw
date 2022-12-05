import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from '../../models/compaign_model';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-edit-campaign-model',
  templateUrl: './edit-campaign-model.component.html',
  styleUrls: ['./edit-campaign-model.component.scss']
})
export class EditCampaignModelComponent {
   campaignEditForm: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Campaign,
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    private formBuilder: FormBuilder) {
    this.campaignEditForm = this.formBuilder.group({
      title: [data.title, [Validators.required]],
      description: [data.description, [Validators.required]],
    });
  }

  editCampaign(){
    console.log(this.campaignEditForm.value)
  }

}
