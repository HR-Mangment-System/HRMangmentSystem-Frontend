import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  baseUrl = 'https://localhost:7109/api/AnnualHolidays'; // API URL 
  constructor(private http: HttpClient) { }
  
  GetHolidays(){
    return this.http.get(`${this.baseUrl}/GetHolidays`);
  }

  createHoliday(holidayName: string , holidayDate:string){
    return this.http.post(`${this.baseUrl}/CreateHoliday`, {holidayName, holidayDate});
  }

  updateHoliday(id: number, holidayName: string , holidayDate:string){
    return this.http.put(`${this.baseUrl}/UpdateHoliday/${id}`, {holidayName, holidayDate});
  }

   // Hnadle ID TO URL //
  deleteHoliday(holidayId: number){
    return this.http.delete(`${this.baseUrl}/DeleteHoliday?holidayId=${holidayId}`);
  }
}
