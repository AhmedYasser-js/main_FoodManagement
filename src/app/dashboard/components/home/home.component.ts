import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/admin/model/Category';
import { IRecipes, ITag } from 'src/app/admin/model/irecipes';
import { CategoryService } from 'src/app/admin/services/category.service';
import { RecipesService } from 'src/app/admin/services/recipes.service';
import { UsersService } from 'src/app/admin/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
  tableData_1: ICategory[] = [];
  RecipesNum:number=0;
  UsersNum:number=0;
  CategoriesNum:number=0;


  constructor(private _Router: Router,private _RecipesService:RecipesService,private _UsersService:UsersService,private _CategoryService:CategoryService) { }

  ngOnInit(): void {
    this.getRecipes();
    this.getUsers();
    this.getCategories();
  }


  goToRecipe() {
    this._Router.navigate(['/dashboard/admin/recipes'])
  }
  userName = localStorage.getItem('userName');
  userRole = localStorage.getItem('userRole');



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
        console.log(response.totalNumberOfRecords)
        this.RecipesNum=response.totalNumberOfRecords;
        this.tableResponse = response;
        this.tableData = response.data;
        console.log(this.tableData);
      }
    });
  }

  getUsers() {
    let paramsApi = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
      userName: this.searchKey
    }
    this._UsersService.getAllUsers(paramsApi).subscribe({
      next: (response) => {
        console.log(response.pageSize);
        console.log(response.totalNumberOfRecords);
        this.UsersNum=response.totalNumberOfRecords;

        this.tableResponse = response;
        this.tableData = response.data;
        console.log(this.tableData);
      }
    });
  }

  getCategories() {
    this._CategoryService.getAllCategory(this.pageSize, this.pageIndex, this.searchKey).subscribe({
      next: (response) => {
        console.log(response);
        console.log(response.totalNumberOfRecords);
        this.CategoriesNum=response.totalNumberOfRecords;

        this.tableResponse = response;
        this.tableData_1 = response.data;
        console.log(this.tableData_1);
      }
    });
  }

}
