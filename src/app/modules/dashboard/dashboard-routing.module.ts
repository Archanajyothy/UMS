import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { authGuard } from '../../services/guards/auth.guard';
import { userGuardGuard } from '../../services/guards/user-guard.guard';

const routes : Routes = [
  {
    path:'admin',
    component: HomeComponent, canActivate:[authGuard]
  },
  {
    path:'user',
    component: UserComponent, canActivate: [userGuardGuard]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class DashboardRoutingModule { }
