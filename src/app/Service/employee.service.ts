import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl: string = 'https://localhost:44337/api/Employees';
  constructor(private http: HttpClient) {}
  getEmployees() {
    return this.http.get(this.baseUrl + '/GetAllEmployees');
  }
}
