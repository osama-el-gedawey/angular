import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from './account.service';
import { inject } from '@angular/core';
import { IAccount } from '../models/iaccount';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  let service = inject(AccountService);
  let currentAcount:IAccount[]|undefined=service.IsLogin();
  if (currentAcount!=undefined && currentAcount?.length!=0)
   return true;
  else {
    let router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};
