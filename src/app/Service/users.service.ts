import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../interfaces/loginUser';
import { userToken } from '../interfaces/userToken';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = 'https://localhost:44337/api/Account/';

  constructor(public http: HttpClient) {}

  loginUser(user: LoginUser) {
    return this.http.post(this.baseUrl + 'login', user);
  }

  loggedinUser: userToken = {
    userID: '',
    userEmail: '',
    userFullName: '',
    userRole: '',
    userName: '',
  };

  retreiveTokenData() {
    let token = localStorage.getItem('UserToken');
    if (token) {
      let userToken: userToken = jwtDecode(token);
      this.loggedinUser.userID = userToken.userID;
      this.loggedinUser.userEmail = userToken.userEmail;
      this.loggedinUser.userFullName = userToken.userFullName;
      this.loggedinUser.userRole = userToken.userRole;
      this.loggedinUser.userName = userToken.userName;
    }
  }

  isUserLoggedIn(): boolean {
    return this.loggedinUser.userID === '' ? false : true;
  }

  logoutUser() {
    localStorage.removeItem('UserToken');
    this.loggedinUser = {
      userID: '',
      userEmail: '',
      userFullName: '',
      userRole: '',
      userName: '',
    };
  }
}
