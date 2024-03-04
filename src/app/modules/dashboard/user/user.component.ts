import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  sidebar: boolean = true;
  apiUrl = '/users/me'
  token = localStorage.getItem('token')
  userData = {}

  constructor(private auth : AuthService) {}
  
  toggleSidebar(){
    this.sidebar = !this.sidebar;
  }
  
  ngOnInit(): void {
    this.auth.getData(this.apiUrl, this.token).subscribe((res: any)=>{
      this.userData = res.data.user;
      console.log(this.userData);
      
    })
  }

  onEdit(){

  }

}
