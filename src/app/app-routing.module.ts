import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './services/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=> import('./modules/auth/auth.module').then(m=> m.AuthModule)
  },
  {
    path:'dashboard',
    loadChildren:()=> import('./modules/dashboard/dashboard.module').then(m=> m.DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
