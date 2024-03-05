import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employe-form',
  templateUrl: './employe-form.component.html',
  styleUrls: ['./employe-form.component.css']
})
export class EmployeFormComponent implements OnInit, OnDestroy {

  constructor(
    private empService: EmployeeService,
    private myRouter: Router,
    private actRoute: ActivatedRoute
  ) { }
  ngOnDestroy(): void {
    this.getSubscribe?.unsubscribe();
    this.actionSubscribe?.unsubscribe();
  }
  myForm: FormGroup = new FormGroup({

    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    adress: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(alex|cairo)$/i)
    ]),
    age: new FormControl(null, [

      Validators.required,
      Validators.min(25),
      Validators.max(60)
    ]),
    salary: new FormControl(null, [

      Validators.required,
      Validators.min(6000),
      Validators.max(100000)
    ]),
    hasAccount:new FormControl(false)
  });

  get nameControl() {
    return this.myForm.get('name');
  }
  get adressControl() {
    return this.myForm.get('adress');
  }
  get ageControl() {
    return this.myForm.get('age');
  }
  get salaryControl() {
    return this.myForm.get('salary');
  }

  id: string | undefined="init";
  getSubscribe: Subscription | undefined;
  actionSubscribe: Subscription | undefined;
  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];

    if (this.id != undefined) {
      this.getSubscribe = this.empService.getById(this.id).subscribe({
        next: (item) => {
          this.myForm.controls['name'].setValue(item.name);
          this.myForm.controls['adress'].setValue(item.adress);
          this.myForm.controls['age'].setValue(item.age);
          this.myForm.controls['salary'].setValue(item.salary);
          this.myForm.controls['hasAccount'].setValue(item.hasAccount);
        },
        error: () => {
          this.myRouter.navigate(['/notFound']);
        }
      })

    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.myForm.valid) {
      if (this.id != undefined) {
        this.actionSubscribe = this.empService.Edit(this.id, this.myForm.value).subscribe();
      } else {

        this.actionSubscribe = this.empService.Add(this.myForm.value).subscribe();
      }
      this.myRouter.navigate(['/employees']);
    }
  }
}
