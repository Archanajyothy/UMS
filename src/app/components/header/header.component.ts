import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isNavbarOpen: boolean = false;

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}
