import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  
})
export class RegisterComponent {
  apiUrl = '/admin/users'
  errorMessage: string = ''
  token = localStorage.getItem('token')

  constructor(private fb: FormBuilder, private auth: AuthService){}

  registerForm = this.fb.group({
    firstName : ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
    lastName : ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
    email : ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)]],
    role: ['',[Validators.required]],
    password: ['',[Validators.required]],
    cpassword: ['', [Validators.required]]
  })

  onRegister(){
    if(this.registerForm.valid && this.token !== null){
      const signUpData = { 
        firstName : this.registerForm.controls.firstName.value,
        lastName : this.registerForm.controls.lastName.value,
        email : this.registerForm.controls.email.value,
        role : this.registerForm.controls.role.value,
        password : this.registerForm.controls.password.value,
        // confirmPw : this.registerForm.controls.cpassword.value
      }
      this.auth.postData(signUpData, this.apiUrl, this.token).subscribe((res: any)=>{
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
      console.log(signUpData);
    }
    this.registerForm.reset()
  }

}
