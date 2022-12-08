import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ConfirmationModalComponent {
  confirmationMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public props: any,
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
  ) {
    this.confirmationMessage = props.message;
  }

  ngOnInit(): void {
  }

  closeModal(isYes = false) {
    this.dialogRef.close({ isYes });
  }
}
