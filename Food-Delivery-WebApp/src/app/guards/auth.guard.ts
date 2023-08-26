import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const userService=inject(UserService)
  const router=inject(Router)
  if(userService.getCurrentUser.token)
  return true;

//  return router.navigate(['/login'])
  //  return false

  router.navigate(['/login'], {queryParams:{returnUrl:state.url}})
    return false;
  
  
};

