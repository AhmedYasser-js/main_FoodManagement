import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryTable } from '../model/Category';

@Injectable({
  providedIn: 'root'
})


export class CategoryService {

  constructor(private _HttpClient: HttpClient) { }


  getAllCategory(pageSize: number, pageNumber: number, searchKey: string): Observable<ICategoryTable> {
    return this._HttpClient.get<ICategoryTable>('Category', { params: { pageSize: pageSize, pageNumber: pageNumber, name: searchKey } });
  };

  onAddCategory(data: string): Observable<any> {
    return this._HttpClient.post('Category', { name: data });
  };

  onEditCategory(name: string, id: string): Observable<any> {
    return this._HttpClient.put(`Category/${id}`, { name });
  };

  onDeleteCategory(id: number, name: string): Observable<any> {
    return this._HttpClient.delete(`Category/${id}`, { body: { name } });
  };

}
