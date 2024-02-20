import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private fb: FormBuilder){}

   loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  submitForm(){
    if(this.loginForm.valid){
        const loginData = {
          username : this.loginForm.controls.username.value,
          password : this.loginForm.controls.password.value
        }
        console.log(loginData);
    }
    
    this.loginForm.reset()
  }
}
