import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) { }


  // getAllUsers(pageSize: number, pageNumber: number, searchKey: string): Observable<any> {
  //   return this._HttpClient.get('Category', { params: { pageSize: pageSize, pageNumber: pageNumber, name: searchKey } });
  // }

  getAllUsers(data: any): Observable<any> {
    return this._HttpClient.get('Users', { params: data });
  }

  deleteUsers(id: number, name: string): Observable<any> {
    return this._HttpClient.delete(`Users/${id}`, { body: { name } });
  }

  getUserById(id: number): Observable<any> {
    return this._HttpClient.get(`Users/${id}`);
  }

  // Users

}
