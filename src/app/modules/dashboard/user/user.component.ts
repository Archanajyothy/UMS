import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  sidebar: boolean = true;

  constructor() {}
  
  toggleSidebar(){
    this.sidebar = !this.sidebar;
  }
}
