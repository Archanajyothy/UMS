import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CreateUserComponent } from '../create-user/create-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  opened = false;

  constructor( public dialog: MatDialog ){}

  openDialog() {
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggle() {
    this.opened = !this.opened;
  }
}
