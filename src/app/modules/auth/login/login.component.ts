import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  apiUrl= '/auth/login'
  hide: boolean = true;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private route : Router){}

   loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]]
  })

  submitForm(){
    if(this.loginForm.valid){
        const loginData = {
          email : this.loginForm.controls.email.value, //the keys of the object should be same as the keys in the backend schema.
          password : this.loginForm.controls.password.value
        }
        //console.log(loginData);
        this.authService.postData(loginData, this.apiUrl).subscribe((res:any) => {
          console.log(res);
          localStorage.setItem('token',res.data.user.accessToken)
          localStorage.setItem('role',res.data.user.role)
          this.route.navigateByUrl('/dashboard')
          
    },
    (error) => {
      if (error.status === 401) {
        this.errorMessage = 'Incorrect email or password';
      } else if (error.status === 404) {
        this.errorMessage = 'User not found';
      } else if (error.status === 500) {
        this.errorMessage = 'Internal server error';
      } else {
        this.errorMessage = 'An error occurred';
      }
    })
    }
    this.loginForm.reset()
  }
}
