import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../models/iemployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseURL: string = 'http://localhost:3002/emoloyes';
  constructor(private http: HttpClient) {}

  getAll(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.baseURL);
  }

  getById(id: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.baseURL}/${id}`);
  }

  Add(emp: IEmployee) {
    return this.http.post(this.baseURL, emp);
  }

  Edit(id: string, emp: IEmployee) {
    return this.http.put(`${this.baseURL}/${id}`, emp);
  }

  Delete(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
