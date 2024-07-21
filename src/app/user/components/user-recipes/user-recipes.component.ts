import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ICategory, ICategoryTable } from 'src/app/admin/model/Category';
import { IRecipes, ITag } from 'src/app/admin/model/irecipes';
import { IUser } from 'src/app/admin/model/user';
import { CategoryService } from 'src/app/admin/services/category.service';
import { HelperService } from 'src/app/admin/services/helper.service';
import { RecipesService } from 'src/app/admin/services/recipes.service';
import { UsersService } from 'src/app/admin/services/users.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { UserRecipesService } from '../../service_user/user-recipes.service';
import { ViewComponent } from 'src/app/shared/view/view.component';
import { FavoritesService } from 'src/app/admin/services/favorites.service';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent implements OnInit {
  constructor(private _HelperService: HelperService, private _RecipesService: RecipesService, private dialog: MatDialog, private _ToastrService: ToastrService, private _CategoryService: CategoryService, private _FavoritesService: FavoritesService) { }

  searchKey: string = '';
  message: string = '';

  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageNumber: number = 1;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent | any;

  tableResponse: any;
  tableData: IRecipes[] = [];
  tags: ITag[] = [];
  Categories: ICategory[] = [];
  imagePath: string = 'https://upskilling-egypt.com:3006/';
  notFoundRecipes: string = './assets/images/recipeImg.jpg';
  tagId: number = 0;
  CategoriesId: number = 0;

  ngOnInit(): void {
    this.getRecipes();
    this.getAllTags();
    this.getAllCategory();
  }

  getRecipes() {
    let paramsApi = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
      name: this.searchKey,
      tagId: this.tagId > 0 ? this.tagId : 0,
      categoryId: this.CategoriesId
    }
    this._RecipesService.getAllRecipe(paramsApi).subscribe({
      next: (response) => {
        console.log(response.pageSize);
        console.log(response)
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
    this.getRecipes()
  }

  getAllCategory() {
    this._CategoryService.getAllCategory(1000, 1, '').subscribe({
      next: (response) => {
        console.log(response.data)
        this.Categories = response.data;
      }
    })
  }

  getAllTags() {
    this._HelperService.getAllRecipe().subscribe({
      next: (response) => {
        console.log(response)
        this.tags = response;
      }
    })
  }

  AddToFav(id: number): void {
    this._FavoritesService.onAddToFav(id).subscribe({
      next: (res) => {
        console.log(res)
      }, error: (error) => {
        this.message = error.error.message;
        this._ToastrService.error(`error in Add To Fav Pross!`);
      }, complete: () => {
        this.getRecipes();
        this._ToastrService.success(`The Recipe was added To Fav successfully ❤️`);
      }
    })
  }

  openViewDialog(dataRecipe: any): void {
    console.log(dataRecipe)
    const dialogRef = this.dialog.open(ViewComponent, {
      data: dataRecipe,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(dataRecipe.id);
      if (result) {
        this.AddToFav(result)
        console.log(dataRecipe.id);
      }
    });
  }
}
