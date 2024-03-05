import { IAccount } from './../../../models/iaccount';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  constructor(private accService:AccountService,private router: Router){}
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
  logout():void{
    this.accService.LogOut();
    this.router.navigate(['/login']);
  }
}
