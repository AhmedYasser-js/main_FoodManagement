import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/admin/model/Category';
import { IRecipes, ITag } from 'src/app/admin/model/irecipes';
import { CategoryService } from 'src/app/admin/services/category.service';
import { FavoritesService } from 'src/app/admin/services/favorites.service';
import { HelperService } from 'src/app/admin/services/helper.service';
import { RecipesService } from 'src/app/admin/services/recipes.service';
import { ViewComponent } from 'src/app/shared/view/view.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  constructor(private _HelperService: HelperService, private _RecipesService: RecipesService, private dialog: MatDialog, private _ToastrService: ToastrService, private _CategoryService: CategoryService, private _FavoritesService: FavoritesService, private _Router: Router) { }

  searchKey: string = '';
  message: string = '';

  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageNumber: number = 1;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent | any;

  tableResponse: any;
  tableData: any[] = [];
  tags: ITag[] = [];
  Categories: ICategory[] = [];
  imagePath: string = 'https://upskilling-egypt.com:3006/';
  notFoundRecipes: string = './assets/images/recipeImg.jpg';
  tagId: number = 0;
  CategoriesId: number = 0;

  ngOnInit(): void {
    // this.AllFavRecipe();
    this.AllFavRecipe()
    this.getAllTags();
    this.getAllCategory();
  }

  AllFavRecipe() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchKey,
    };
    this._FavoritesService.onAllFavRecipe(params).subscribe({
      next: (response) => {
        console.log(response.pageSize);
        // console.log(response)
        this.tableResponse = response;
        this.tableData = response.data;
        console.log(this.tableData);
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.AllFavRecipe()
  }

  getAllCategory() {
    this._CategoryService.getAllCategory(1000, 1, '').subscribe({
      next: (response) => {
        // console.log(response.data)
        this.Categories = response.data;
      }
    })
  }

  getAllTags() {
    this._HelperService.getAllRecipe().subscribe({
      next: (response) => {
        // console.log(response)
        this.tags = response;
      }
    })
  }


  removeFromFav(recipeId: number) {
    this._FavoritesService.removeFromFav(recipeId).subscribe({
      next: (res) => {
        this.AllFavRecipe();

      }, error: (error) => {
        this.message = error.error.message;
        this._ToastrService.error(`error in remove From Fav!`);
      }, complete: () => {
        this.AllFavRecipe();
        this._ToastrService.success(`The Recipe was removed From Fav successfully`);
      }
    })
  }


  AddToFav(id: number): void {
    this._FavoritesService.onAddToFav(id).subscribe({
      next: (res) => {
        // console.log(res)
      }, error: (error) => {
        this.message = error.error.message;
        this._ToastrService.error(`error in Add To Fav Pross!`);
      }, complete: () => {
        this.AllFavRecipe()
        this._ToastrService.success(`The Recipe was added To Fav successfully ❤️`);
      }
    })
  }



  goToRecipe() {
    this._Router.navigate(['/dashboard/user/user_Recipes'])
  }

}
