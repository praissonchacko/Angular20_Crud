import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Employee } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Angular20_Crud');

  //employeeForm  : FormGroup | undefined;
    employeeForm  : FormGroup =new FormGroup({});
  employee  : Employee = new Employee();
  employeeList :Employee[] = [];

  constructor(){
    this.createForm();
     const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm(){
    this.employeeForm= new FormGroup({
//Empid : new FormControl(0),
//Name : new FormControl("")
        Empid  : new FormControl(this.employee.Empid),
        name : new FormControl(this.employee.name,[Validators.required]),
        city  : new FormControl(this.employee.city,[Validators.required]),
        state : new FormControl(this.employee.state,[Validators.required]),
        emailId  : new FormControl(this.employee.emailId,[Validators.required]),
        contactNo : new FormControl(this.employee.contactNo,[Validators.required]),
        pinCode  : new FormControl(this.employee.pinCode,[Validators.required]),
        address : new FormControl(this.employee.address,[Validators.required]),
    })
  }

  Reset(){
     this.employee=new Employee();
     this.createForm();  
  }

  OnSave(){
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls["Empid"].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    }
    else{
      this.employeeList.unshift(this.employeeForm.value);
     
    }
     localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
     this.employee=new Employee();
     this.createForm();    
  }

  OnEdit(item:Employee){
     this.employee = item;
     this.createForm();
  }
  OnUpdate(){
    const record = this.employeeList.find(m=>m.Empid== this.employeeForm.controls["Empid"].value);
      if(record != undefined){
          record.name = this.employeeForm.controls["name"].value;
          record.emailId = this.employeeForm.controls["emailId"].value;
          record.contactNo = this.employeeForm.controls["contactNo"].value;
          record.city = this.employeeForm.controls["city"].value;
          record.state = this.employeeForm.controls["state"].value;
          record.pinCode = this.employeeForm.controls["pinCode"].value;
          record.address = this.employeeForm.controls["address"].value;
      }
 localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
 this.employee=new Employee();
 this.createForm();      
  }
  OnDelete(id : number){
    const isDelete = confirm("Are you sure want to delete");
    if(isDelete){
      const index = this.employeeList.findIndex(m=>m.Empid == id);
      this.employeeList.splice(index,1)
       localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    }
  }
}
