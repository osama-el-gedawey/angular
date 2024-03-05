import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEmployee } from 'src/app/models/iemployee';
import { AccountService } from 'src/app/services/account.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit, OnDestroy {

  constructor(
    private empService: EmployeeService,
    private accService: AccountService,
    private myRouter: Router,
    private actRoute: ActivatedRoute
  ) { }
  ngOnDestroy(): void {
    this.getSubscribe?.unsubscribe();
    this.actionSubscribe?.unsubscribe();
  }
  myForm: FormGroup = new FormGroup({

    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    empId: new FormControl(''),
    role: new FormControl("employee")
  });

  get usernameControl() {
    return this.myForm.get('username');
  }
  get passwordControl() {
    return this.myForm.get('password');
  }


  id: string | undefined;
  getSubscribe: Subscription | undefined;
  actionSubscribe: Subscription | undefined;
  currentEmployee:IEmployee={id:"",adress:"",name:"",age:0,salary:0,hasAccount:false};
  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];
    if (this.id != undefined) {
      this.getSubscribe = this.empService.getById(this.id).subscribe({
        next: (data) => { this.currentEmployee=data},
        error: () => {
          this.myRouter.navigate(['/notFound']);
        }
      })

    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.myForm.valid) {
      this.myForm.controls['empId'].setValue(this.id);
      this.actionSubscribe = this.accService.Add(this.myForm.value).subscribe();
      this.currentEmployee.hasAccount=true;
      this.getSubscribe = this.empService.Edit(this.currentEmployee.id,this.currentEmployee).subscribe()
      this.myRouter.navigate(['/employees']);
    }
  }
}
