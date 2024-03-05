import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAccount } from 'src/app/models/iaccount';
import { IEmployee } from 'src/app/models/iemployee';
import { AccountService } from 'src/app/services/account.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(private empService: EmployeeService, private accService: AccountService) { }
  ngOnDestroy(): void {
    this.employeSubscribe?.unsubscribe();
  }
  ngOnInit(): void {
    this.currentAccount = this.accService.IsLogin();
    if (this.currentAccount?.length != 0 && this.currentAccount != undefined) {
      if (this.currentAccount[0].role != "admin") {
        this.employeSubscribe = this.empService.getById(this.currentAccount[0].empId)
          .subscribe((data) => {
            this.currentEmployee = data;
          });
      }
    }

  }
  employeSubscribe: Subscription | undefined;
  currentAccount: IAccount[] | undefined;
  currentEmployee: IEmployee | undefined;

}
