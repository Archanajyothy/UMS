import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { authGuard } from '../../services/guards/auth.guard';

const routes : Routes = [
  {
    path:'',
    component: HomeComponent, canActivate:[authGuard]
  },
  {
    path:'user',
    component: UserComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class DashboardRoutingModule { }
