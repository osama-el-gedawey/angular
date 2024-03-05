import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAccount } from 'src/app/models/iaccount';

import { IEmployee } from 'src/app/models/iemployee';
import { AccountService } from 'src/app/services/account.service';

import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnDestroy,OnInit {
  constructor(private empService: EmployeeService ,private accService:AccountService) { }
  ngOnInit(): void {
    this.getSubscribe=this.empService.getAll().subscribe((data)=>{this.empList=data;})
  }
  getSubscribe:Subscription|undefined;
  deleteSubscribe:Subscription|undefined;
  deleteAccSubscribe:Subscription|undefined;
  empList:IEmployee[]=[];
  ngOnDestroy(): void {
    this.getSubscribe?.unsubscribe();
    this.deleteSubscribe?.unsubscribe();
    this.deleteAccSubscribe?.unsubscribe();
  }
 
  delete(id:string){
    this.deleteSubscribe=this.empService.Delete(id).subscribe(()=>{
      this.getSubscribe=this.empService.getAll().subscribe((data)=>{this.empList=data;})
    });
    this.deleteAccSubscribe=this.accService.getByEmpId(id).subscribe({
      next:(data)=>{
        if(data.length!=0){
          this.accService.Delete(data[0].id).subscribe();
        }
      }
    })
    
  }
}
