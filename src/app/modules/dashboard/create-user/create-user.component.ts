import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  errorMessage = ''
  apiUrl = '/admin/users'
  token = localStorage.getItem('token')
  constructor(private dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,private fb : FormBuilder, private auth: AuthService){}

  addUserForm = this.fb.group({
    firstName : ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
    lastName : ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
    email : ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)]],
    role: ['',[Validators.required]],
    password: ['',[Validators.required]],
    cpassword: ['', [Validators.required]]
  })

  onSubmit() {
    if(this.addUserForm.valid && this.token !== null){
      const UserData = { 
        firstName : this.addUserForm.controls.firstName.value,
        lastName : this.addUserForm.controls.lastName.value,
        email : this.addUserForm.controls.email.value,
        role : this.addUserForm.controls.role.value,
        password : this.addUserForm.controls.password.value,
        // confirmPw : this.addUserForm.controls.cpassword.value
      }
      this.auth.postData(UserData, this.apiUrl, this.token).subscribe((res: any)=>{
        console.log(res);
      },
      (error) => {
        if (error.status === 400) {
          this.errorMessage = 'Missing token';
        } else if (error.status === 401) {
          this.errorMessage = 'Invalid token';
        } else if (error.status === 403) {
          this.errorMessage = 'Admin authorization failed';
        }  else if (error.status === 404) {
          this.errorMessage = 'Path is incorrect';
        }  else if (error.status === 405) {
          this.errorMessage = 'Method is not allowed';
        }  else if (error.status === 409) {
          this.errorMessage = 'Email has already been registered';
        }  else if (error.status === 422) {
          this.errorMessage = 'Validation failed';
        } else {
          this.errorMessage = 'An error occurred';
        }
      })
    this.dialogRef.close(UserData);
    }
  }
}
