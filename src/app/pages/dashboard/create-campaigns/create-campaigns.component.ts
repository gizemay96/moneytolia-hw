import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { CampaignsService } from 'src/app/services/compaigns-service/compaigns-service.service';


@Component({
  selector: 'app-create-campaigns',
  templateUrl: './create-campaigns.component.html',
  styleUrls: ['./create-campaigns.component.scss']
})
export class CreateCampaignsComponent {
  public campaignForm: FormGroup;
  typeList = require('../../../core/data/campaign_types_data.json');
  today = moment();


  constructor(private formBuilder: FormBuilder, private campaignService: CampaignsService) {
    this.campaignForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      score: [0, [Validators.required]],
      type: [1, [Validators.required]],
      expireDate: [this.today, [Validators.required]],
    });
  }

  setCampaignType(selectedType: number) {
    this.campaignForm.controls['type'].setValue(selectedType);
  }

  async addCampaign() {
    console.log(this.campaignForm.value)
    if (this.campaignForm.valid) {
      const response = await firstValueFrom(this.campaignService.addCampaign(this.campaignForm.value));
    }
  }

}
