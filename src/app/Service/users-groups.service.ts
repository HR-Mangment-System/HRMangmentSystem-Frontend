import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersGroupsService {
  baseUrl: string = 'https://localhost:7109/api/Group/CreateGroup'; 

  constructor(private http: HttpClient) { }

  
}
