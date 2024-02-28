import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from 'express';

export const loginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const router = inject(Router)
  if(token){
    router.navigate(['']);
    return false
  }else{
    return true
  }
};
