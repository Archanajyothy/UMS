import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  constructor(public dialogRef: MatDialogRef<DeleteModalComponent>) {}
  confirmDelete(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
