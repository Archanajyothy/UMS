import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  {
    path:'',
    component: LoginComponent
  },
  {
    path:'signup',
    component: RegisterComponent
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule { }
