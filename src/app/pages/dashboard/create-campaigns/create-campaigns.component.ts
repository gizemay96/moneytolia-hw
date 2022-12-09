import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CampaignType } from 'src/app/core/models/compaign_model';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { CommonModule } from '@angular/common';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MessageModalComponent } from 'src/app/core/components/message-modal/message-modal.component';
import { WhiteSpaceValidator } from 'src/app/core/validators/whiteSpace.validator';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-create-campaigns',
  templateUrl: './create-campaigns.component.html',
  styleUrls: ['./create-campaigns.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatButtonModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export default class CreateCampaignsComponent {
  public campaignForm: FormGroup;
  typeList = require('../../../core/data/campaign_types_data.json');
  today = new Date();
  typeRequiredErr = false;


  constructor(private formBuilder: FormBuilder, private campaignService: CampaignsService, public dialog: MatDialog) {
    this.campaignForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(55), WhiteSpaceValidator]],
      description: [null, [Validators.required, WhiteSpaceValidator]],
      score: [0, [Validators.required, Validators.min(0)]],
      type: [null, [Validators.required]],
      expireDate: [this.today, [Validators.required]],
    });
  }

  setCampaignType(selectedType: CampaignType) {
    this.campaignForm.controls['type'].setValue(selectedType);
  }

  addCampaign() {
    if (this.campaignForm.valid && !this.campaignForm.controls['type'].errors) {
      this.campaignService.addCampaign(this.campaignForm.value);
      this.formResetOperations();
      this.showSuccessMessage();
    }
    else {
      this.campaignForm.markAllAsTouched();
      this.typeRequiredErr = true;
    }
  }

  formResetOperations() {
    this.campaignForm.reset();
    this.campaignForm.controls['expireDate'].setValue(this.today);
    this.campaignForm.controls['score'].setValue(0);
    this.typeRequiredErr = false;
    Object.keys(this.campaignForm.value).map(key => { this.campaignForm.controls[key].markAsUntouched() });
  }

  showSuccessMessage() {
    const data = { panelClass: 'modal-smc', data: { message: 'Kampanya başarılı bir şekilde eklenmiştir.', isSuccessMessage: true } };
    this.dialog.open(MessageModalComponent, data);
  }

}
