import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from './../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { UserService } from './../shared/user.service';

declare var M: any;

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  userId;
  searchText;
  dataRefresher: any;

  constructor(public employeeService: EmployeeService, private userService: UserService, private router: Router) { 
  }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userId = res['user']._id;
        localStorage.setItem("userId", this.userId);
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  resetForm(form?: NgForm) {
    if(form)
      form.reset();
      this.refreshEmployeeList();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
  }

  onSubmit(form: NgForm) {
    if(form.value._id == "") {
    this.employeeService.postEmployee(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshEmployeeList();
      M.toast({html: 'Saved Successfully', classes: 'rounded'});
    })
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({html: 'Updated Successfully', classes: 'rounded'});
      })
    }
  }

  refreshEmployeeList() {
    this.dataRefresher =
    setTimeout(() => {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    })
  }, 1000);
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if(confirm('Are you sure to delete this record?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm();
        M.toast({html: 'Deleted succesfully', classes: 'rounded'});
      });
    }
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
    localStorage.removeItem("userId");
  }



}
