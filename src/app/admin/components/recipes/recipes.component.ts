import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
// import { ICategoryTable, ICategory } from '../../model/Category';
import { IRecipeTable, IRecipes, ITag } from '../../model/irecipes';
import { HelperService } from '../../services/helper.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../model/Category';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  constructor(private _HelperService: HelperService, private _RecipesService: RecipesService,
    private dialog: MatDialog, private _ToastrService: ToastrService, private _CategoryService: CategoryService) { }

  searchKey: string = '';
  message: string = '';

  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageNumber: number = 0;
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

  // pageNumber: 1,
  // pageSize: 5,
  // totalNumberOfRecords: 6,
  // totalNumberOfPages: 2


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    //  totale number of recordes
    this.length = e.length;
    //  totale number of pages
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getRecipes();
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

  openDeleteRecipeDialog(dataRecipe: any): void {
    console.log(dataRecipe)
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: dataRecipe,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('aaaaaaaaaaaaa', result)
      console.log('The dialog was closed');
      console.log(dataRecipe.id, dataRecipe.name);
      if (result) {
        this.deleteRecipe(result, dataRecipe.name)
      }
      console.log(dataRecipe.id, dataRecipe.name);
    });
  }

  deleteRecipe(recipeId: number, name: string) {
    this._RecipesService.deleteRecipe(recipeId, name).subscribe({
      next: (res) => {
      }, error: (error) => {
        this.message = error.error.message;
        this._ToastrService.error(`error in deleted Pross!`);
      }, complete: () => {
        this.getRecipes();
        this._ToastrService.success(`The Recipe was deleted successfully`);
      }
    })
  }
}
