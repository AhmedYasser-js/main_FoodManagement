import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private _HttpClient: HttpClient) { }


  getAllRecipe(data: any): Observable<any> {
    return this._HttpClient.get('Recipe', { params: data });
  }

  onAddRecipe(data: any): Observable<any> {
    return this._HttpClient.post('Recipe', data);
  }

  onEditeRecipe(id: number, data: any): Observable<any> {
    return this._HttpClient.put(`Recipe/${id}`, data);
  }

  getRecipeById(id: number): Observable<any> {
    return this._HttpClient.get(`Recipe/${id}`);
  }

  deleteRecipe(id: number, name: string): Observable<any> {
    return this._HttpClient.delete(`Recipe/${id}`, { body: { name } });
  }
  // Users
}
