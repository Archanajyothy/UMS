import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateUserComponent } from '../../modules/dashboard/create-user/create-user.component';
import { LogoutComponent } from '../logout/logout.component';
import { LoginComponent } from '../../modules/auth/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  @Output() toggle = new EventEmitter();

  constructor(private router: Router, public dialog: MatDialog) {}

  openLogoutModal(): void {
    const dialogRef = this.dialog.open(LogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Perform logout action here
        console.log('User confirmed logout');
        this.logout();
      } else {
        console.log('User canceled logout');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id')
    this.router.navigate(['']);
  }

  onToggled(){
    this.toggle.emit();
  }
}
