import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface ApiResponse {
  status: string;
  message: string;
  data: {
    file: {
      filename: string;
      path: string;
    };
  };
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  sidebar: boolean = true;
  apiUrl = '/users/me'
  token = localStorage.getItem('token')
  userData: any = {};
  userForm !: FormGroup;
  selectedFile = ''
  imagePath = ''
  profileImageUrl:any;
  editMode = false;

  constructor(private auth : AuthService, private fb: FormBuilder, private http : HttpClient) {}
  
  toggleSidebar(){
    this.sidebar = !this.sidebar;
  }
  
  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.auth.getData(this.apiUrl, this.token).subscribe((res: any)=>{
      this.userData = res.data.user;
      // this.profileImageUrl = 'http://localhost:3000/' + res?.data?.user?.profilePictureUrl
      this.userForm = this.fb.group({
        firstName: [this.userData?.firstName, Validators.required],
        lastName: [this.userData?.lastName, Validators.required],
        email: [this.userData?.email],
        profilePictureUrl : [this.userData.profilePictureUrl]
      });
      this.profileImageUrl = 'http://localhost:3000/' + res?.data?.user?.profilePictureUrl;
    })
  }

  //for getting the img url
  onFileSelected(event:any){
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile);
    let token = localStorage.getItem('token');
    if(token) {
      let apiUrl="/users/me/profile-picture"
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const formData = new FormData()
      formData.append('file', this.selectedFile);
      console.log(formData.get('file'),'from formdata');

      this.http.post<ApiResponse>('http://localhost:3000/api/users/me/profile-picture',formData,{headers})
      .subscribe((res)=>{
        console.log(res);
        this.imagePath = res?.data?.file?.path;
        this.profileImageUrl = 'http://localhost:3000/' + this.imagePath; 
        console.log(this.imagePath, 'imgpath');
      })
  }
  }

  onEdit(){
    this.editMode = true;
  }

  onClose(){
    this.editMode = false;    
  }

//   updateButtonClicked(){
//     if(this.selectedFile){      
//       let token = localStorage.getItem('token');
//       const newData = {
//         firstName : this.userForm.controls?.['firstName'].value,
//         lastName : this.userForm.controls?.['lastName'].value,
//         profilePictureUrl : this.userData.profilePictureUrl
//         // firstName: this.userData.firstName,
//         // lastName: this.userData.lastName,
//         // profilePictureUrl: this.userData.profilePictureUrl
        
//       }
//         if (token) {
//           let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
//           Object.assign(newData,{"profilePictureUrl":this.imagePath})
//           console.log(newData,'from newData');
          
//       let apiUrl="/users/me"
//       this.auth.putData(apiUrl, newData, token).subscribe((res:any)=>{
//         console.log(res);
//         if (res.status === "true") {
          
//         }
//       })
//     }
//   }
//   this.editMode = false;
// }

updateButtonClicked() {
  if (this.selectedFile) {      
    const token = localStorage.getItem('token');
    if (token) {
      // Get the form control values for first name and last name
      const firstName = this.userForm.get('firstName')?.value;
      const lastName = this.userForm.get('lastName')?.value;

      // Prepare the data to be updated
      const newData = {
        firstName: firstName,
        lastName: lastName,
        profilePictureUrl: this.imagePath
      };

      // API endpoint for updating user details
      const apiUrl = "/users/me";

      // Send PUT request to update user details
      this.auth.putData(apiUrl, newData, token).subscribe((res: any) => {
        console.log(res);
        if (res.status === "true") {
          // Update userData object with new values
          this.userData.firstName = firstName;
          this.userData.lastName = lastName;
          this.userData.profilePictureUrl = this.imagePath;

          this.userForm.patchValue({
            firstName: newData.firstName,
            lastName: newData.lastName
          });
          // Reset the form and exit edit mode
          this.userForm.reset();
          this.editMode = false;
        }
      });
    }
  }
}




}
