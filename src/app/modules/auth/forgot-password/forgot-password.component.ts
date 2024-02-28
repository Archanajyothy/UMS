import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor(private fb: FormBuilder, private authService: AuthService, private route : Router){}

  forgotForm = this.fb.group({
   email: ['', [Validators.required, Validators.email]],
 })
}
