import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../services/auth.interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,  
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,
    multi: true
  },]
})
export class AuthModule { }
