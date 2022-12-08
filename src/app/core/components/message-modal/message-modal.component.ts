import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent {
  message: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public props: any,
    public dialogRef: MatDialogRef<MessageModalComponent>,
  ) { 
    this.message = props.message;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.closeModal();
    }, 2300);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
