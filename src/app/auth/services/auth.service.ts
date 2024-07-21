import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  role: string | any = '';
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.getProfile()
    }
  }

  // * System Roles
  getProfile() {
    let encoded: any = localStorage.getItem('userToken');
    let decode: any = jwtDecode(encoded);
    localStorage.setItem('userRole', decode.userGroup);
    localStorage.setItem('userName', decode.userName);
    this.getRole()
  }

  getRole() {
    if (
      localStorage.getItem('userToken') !== null
      &&
      localStorage.getItem('userRole')
    ) {
      this.role = localStorage.getItem('userRole')
    }
  }



  onLogin(data: object): Observable<any> {
    return this._HttpClient.post('Users/Login', data)
  }

  onRegister(data: any): Observable<any> {
    return this._HttpClient.post('Users/Register', data);
  }

  onVerify(data: any): Observable<any> {
    console.log(data);
    return this._HttpClient.put('Users/verify', data);
  }

  ResetRequestPass(data: any): Observable<any> {
    console.log(data);
    return this._HttpClient.post('Users/Reset/Request', data);
  }

  ResetPassword(data: any): Observable<any> {
    console.log(data);
    return this._HttpClient.post('Users/Reset', data);
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    this._Router.navigate(['/auth/login'])
  }

  onChangePassword(data: any): Observable<any> {
    console.log(data);
    return this._HttpClient.put('Users/ChangePassword', data);
  }


  // logOut() {
  //   localStorage.clear();
  // }


  onEditUser(id:number,data:any):Observable<any>{
    return this._HttpClient.put(`Users`,data,{params:{id}})
  
  }
  getCurrentUser() :Observable<any>{
    return this._HttpClient.get("Users/currentUser")

  }

}
