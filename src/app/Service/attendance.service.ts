import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  baseUrl = 'https://localhost:44337/api/AttendanceReport';
  constructor(public http: HttpClient) {}
  getallAttendance() {
    return this.http.get(this.baseUrl + '/GetAttendanceReport');
  }
}
