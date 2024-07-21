import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private _HttpClient: HttpClient) { }

  onAllFavRecipe(data:any): Observable<any> {
    return this._HttpClient.get('userRecipe',{ params: data });
  }
  // getAllFavourites(data: any): Observable<any> {
  //   return this._httpClient.get('userRecipe',{ params: data });
  // }

  onAddToFav(id: number): Observable<any> {
    return this._HttpClient.post('userRecipe', { recipeId: id });
  }

  removeFromFav(id: number): Observable<any> {
    return this._HttpClient.delete(`userRecipe/${id}`);
  }

}
