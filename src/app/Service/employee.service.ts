import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl: string = 'https://localhost:44337/api/Employees';
  constructor(private http: HttpClient) {}
  getEmployees() {
    return this.http.get(this.baseUrl + '/GetAllEmployees');
  }
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // Add other headers as needed
  });
  options = { headers: this.headers };
  apiURL = 'http://localhost:5023/api/Employees/';

  addEmp(emp: Employee) {
    return this.http.post(this.apiURL + 'AddEmployee', emp, this.options);
  }
  updateEmp(emp: Employee) {
    return this.http.put(this.apiURL + 'UpdateEmployee', emp);
  }
  deleteEmp(NationalId: string) {
    // return this.http.delete(this.apiURL + `DeleteEmployee/${NationalId}`);

    return this.http.delete(
      `${this.apiURL}DeleteEmployee?NationalId=${NationalId}`
    );
  }
}
