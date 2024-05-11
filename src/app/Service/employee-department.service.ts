import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDepartmentService {

  constructor(private _httpsClient: HttpClient) { }
  baseUrl: string = 'https://localhost:44337/api/Departments/';

  getDepartments() {
    return this._httpsClient.get(this.baseUrl + 'GetAllDepartments');
  }
  getDepartmentById(id: number) {
    return this._httpsClient.get(this.baseUrl + 'GetDepartmentById/' + id);
  }
  deleteDepartment(id: number) {
    return this._httpsClient.delete(this.baseUrl + 'DeleteDepartment/' + id);
  }
}
