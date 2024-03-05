import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IAccount } from '../models/iaccount';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) {
    if ((window.sessionStorage.getItem("loginUsersData")) == null) {
      let loginUsersData:IAccount[]=[];
      sessionStorage.setItem("loginUsersData", JSON.stringify(loginUsersData));
    };
    this.loginUser=JSON.parse(sessionStorage.getItem("loginUsersData")as string);
  }
  loginUser:IAccount[]|undefined;
 
  baseUrl:string='http://localhost:3002/accounts';
  //loginUser:IAccount[]=[];
  LogIn(username:string,password:string):Observable<IAccount[]>{
    return this.http.get<IAccount[]>(`${this.baseUrl}?username=${username}&password=${password}`);
  }
 
  IsLogin():IAccount[]|undefined{
    
    return this.loginUser;
     
  }

  Add(acc:IAccount){
    return this.http.post(this.baseUrl, acc);
  }
  Delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getByEmpId(empId: string): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`${this.baseUrl}?empId=${empId}`);
  }
  LogOut(){
    this.loginUser=[];
    sessionStorage.setItem("loginUsersData", JSON.stringify(this.loginUser))
  }
}
