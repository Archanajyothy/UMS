import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  
})
export class RegisterComponent {
  apiUrl = '/agents'
  errorMessage: string = ''
  hide: boolean = true;
  hide2: boolean = true;
  // token = localStorage.getItem('token')

  constructor(private fb: FormBuilder, private auth: AuthService){}

  registerForm = this.fb.group({
    firstName : ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
    lastName : ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
    email : ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)]],
    role: ['',[Validators.required]],
    password: ['',[Validators.required]],
    cpassword: ['', [Validators.required]]
  }, {
    validators: this.passwordMatchValidator 
  })

  passwordMatchValidator(form: FormGroup) {
    const password1 = form.get('password')
    const password2 = form.get('cpassword')
    if (password1 && password2 && password1.value !== password2.value && password2.value !== '') {
      password2?.setErrors({ passwordMismatch: true })
    } else {
      // password2?.setErrors(null)
    }

  }

  onRegister(){
    if(this.registerForm.valid){
      const signUpData = { 
        firstName : this.registerForm.controls['firstName'].value,
        lastName : this.registerForm.controls['lastName'].value,
        email : this.registerForm.controls['email'].value,
        password : this.registerForm.controls['password'].value,
      }
      this.auth.postData(signUpData, this.apiUrl).subscribe((res: any)=>{
        console.log(res);
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Unauthorized';
        }else if (error.status === 404) {
          this.errorMessage = 'Path is incorrect';
        }  else if (error.status === 405) {
          this.errorMessage = 'Method is not allowed';
        }  else if (error.status === 409) {
          this.errorMessage = 'Email has already been registered';
        }  else if (error.status === 422) {
          this.errorMessage = 'Validation failed';
        } else if (error.status === 500) {
          this.errorMessage = 'Internal server error';
        } else {
          this.errorMessage = 'An error occurred';
        }
      })
      console.log(signUpData);
    }
    this.registerForm.reset()
  }

}
