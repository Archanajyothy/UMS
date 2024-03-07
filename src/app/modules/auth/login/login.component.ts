import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  apiUrl= '/auth/login'
  hide: boolean = true;
  errorMessage: string = '';
  showSpinner = false;

  constructor(private fb: FormBuilder, private authService: AuthService,private common : CommonService, private route : Router){}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined'){
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (token && (role === 'admin' || role === 'supervisor')) {
      this.route.navigate(['dashboard/admin']);
    } else if(token){
      this.route.navigate(['dashboard/user']);
    } else {
      this.route.navigate([''])
    }
  }
  }

   loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
  })

  submitForm(){
    if(this.loginForm.valid){
      this.showSpinner = true;
        const loginData = {
          email : this.loginForm.controls.email.value, //the keys of the object should be same as the keys in the backend schema.
          password : this.loginForm.controls.password.value
        }
        //console.log(loginData);
        this.authService.postData(loginData, this.apiUrl).subscribe((res:any) => {
          console.log(res);
          this.showSpinner = false;
            localStorage.setItem('token',res.data.user.accessToken)
            localStorage.setItem('role',res.data.user.role)
            localStorage.setItem('id',res.data.user.id)         
          if (res.data.user.accessToken && (res.data.user.role === 'admin' || res.data.user.role === 'supervisor')) {
            this.route.navigate(['dashboard/admin']);
          } else {
            this.route.navigate(['dashboard/user']);
          }
          
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
