import { Component } from '@angular/core';
import { IAccount } from 'src/app/models/iaccount';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private accService:AccountService){}
  ngOnInit(): void {
    this.currentLogin=this.accService.IsLogin();
  }
  currentLogin:IAccount[]|undefined;
  loginRole:string|undefined;
  IsLogin():boolean{
    this.currentLogin=this.accService.IsLogin();
    if(this.currentLogin?.length!=0&&this.currentLogin!=undefined){
      this.loginRole=this.currentLogin[0].role;
      return true;
    }
    return false;
  }
  IsAdmin():boolean{
    if(this.loginRole=="admin")
      return true;
    return false;
  }

}
