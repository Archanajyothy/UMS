import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  
})
export class RegisterComponent {

  constructor(private fb: FormBuilder){}

  registerForm = this.fb.group({
    firstName : ['', [Validators.required]],
    lastName : ['', Validators.required],
    email : ['', [Validators.required, Validators.email]],
    role: ['',[Validators.required]],
    password: ['',[Validators.required]],
    cpassword: ['', [Validators.required]]
  })

  onRegister(){
    if(this.registerForm.valid){
      const signUpData = { 
        firstName : this.registerForm.controls.firstName.value,
        lastName : this.registerForm.controls.lastName.value,
        email : this.registerForm.controls.email.value,
        role : this.registerForm.controls.role.value,
        password : this.registerForm.controls.password.value,
        confirmPw : this.registerForm.controls.cpassword.value
      }
  
      console.log(signUpData);
    }
    this.registerForm.reset()
  }

}
