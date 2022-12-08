import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { MessageModalComponent } from 'src/app/core/components/message-modal/message-modal.component';
import { CampaignType } from 'src/app/core/models/compaign_model';
import { CampaignsService } from 'src/app/services/campaigns.service';


@Component({
  selector: 'app-create-campaigns',
  templateUrl: './create-campaigns.component.html',
  styleUrls: ['./create-campaigns.component.scss']
})
export class CreateCampaignsComponent {
  public campaignForm: FormGroup;
  typeList = require('../../../core/data/campaign_types_data.json');
  today = moment();


  constructor(private formBuilder: FormBuilder, private campaignService: CampaignsService, public dialog: MatDialog) {
    this.campaignForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required]],
      score: [0, [Validators.required, Validators.min(0)]],
      type: [null, [Validators.required]],
      expireDate: [this.today, [Validators.required]],
    });
  }

  setCampaignType(selectedType: CampaignType) {
    this.campaignForm.controls['type'].setValue(selectedType);
  }

  async addCampaign() {
    if (this.campaignForm.valid) {
      this.campaignService.addCampaign(this.campaignForm.value);
      this.formResetOperations();
      this.showSuccessMessage();
    }
  }

  formResetOperations() {
    this.campaignForm.reset();
    this.campaignForm.controls['expireDate'].setValue(this.today);
  }

  showSuccessMessage() {
    const data = { panelClass: 'modal-smc', data: { message: 'Kampanya başarılı bir şekilde eklenmiştir.', isSuccessMessage: true } };
    this.dialog.open(MessageModalComponent, data);
  }

}
