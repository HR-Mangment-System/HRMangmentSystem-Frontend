import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  baseUrl = 'https://localhost:44337/api/AnnualHolidays/CreateHoliday';
  constructor(private http: HttpClient) { }

  addHoliday(holidayData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, holidayData);
  }

}
