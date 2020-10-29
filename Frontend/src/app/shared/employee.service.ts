import { UserService } from './user.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  userId;

  constructor(private http: HttpClient, private userService: UserService) { 
    this.userService.getUserProfile().subscribe(
      res => {
        this.userId = res['user']._id;
      },
      err => { 
        console.log(err);
      }
    );
  }

  postEmployee(emp: Employee) {
    return this.http.post(environment.apiBaseUrl+'/employees', emp);
  }

  getEmployeeList() {
    this.userId = localStorage.getItem("userId");
    return this.http.get(environment.apiBaseUrl + '/employees/' + this.userId);
  }

  putEmployee(emp: Employee) {
    return this.http.put(environment.apiBaseUrl+'/employees' + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(environment.apiBaseUrl+'/employees' + `/${_id}`);
  }

}
