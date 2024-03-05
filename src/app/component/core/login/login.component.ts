import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy,OnInit{
  constructor(private accService:AccountService,private router: Router){}
  ngOnInit(): void {
    this.accService.LogOut();
  }
  ngOnDestroy(): void {
    this.loginSubscrib?.unsubscribe();
  }
  
  loginSubscrib:Subscription|undefined;
  myForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });
  flag:boolean=false;
  get usernameControl() {
    return this.myForm.get('username');
  }
  get passwordControl() {
    return this.myForm.get('password');
  }
   onSubmit(e:Event){
    e.preventDefault;
    if (this.myForm.valid) {
      this.loginSubscrib=this.accService.LogIn(this.myForm.value.username, this.myForm.value.password)
      .subscribe({
        next:(data)=>{
            this.accService.loginUser=data;
            sessionStorage.setItem("loginUsersData", JSON.stringify(data));
            if(data.length!=0){
              if(data[0].role!="admin")
                this.router.navigate(['/profile']);
              else
                this.router.navigate(['/employees']);
            }
            else
              this.flag=true;
        }
      })
    }
  }
}
