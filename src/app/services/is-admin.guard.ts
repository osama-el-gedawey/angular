import { CanActivateFn} from '@angular/router';
import { AccountService } from './account.service';
import { inject } from '@angular/core';
import { IAccount } from '../models/iaccount';

export const isAdminGuard: CanActivateFn = (route, state) => {
  let service = inject(AccountService);
  let currentAcount:IAccount[]|undefined=service.IsLogin();
  if (currentAcount!=undefined && currentAcount?.length!=0){
    if(currentAcount[0].role=="admin")
      return true;
    else
      return false;
  }
  else {
    return false;
  }

};
