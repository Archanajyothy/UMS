import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  sidebar: boolean = true;
  role = localStorage?.getItem('role');

  constructor() {}
  
  toggleSidebar(){
    this.sidebar = !this.sidebar;
  }
}
