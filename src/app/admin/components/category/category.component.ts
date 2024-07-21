import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory, ICategoryTable, } from '../../model/Category';
import { PageEvent } from '@angular/material/paginator';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor(private _CategoryService: CategoryService, private dialog: MatDialog, private _ToastrService: ToastrService) { }

  searchKey: string = '';
  message: string = '';


  length = 50;
  pageSize = 5;
  pageIndex: number = 0;
  pageNumber: number = 0;
  pageSizeOptions = [5, 10, 20];
  pageEvent: PageEvent | any;


  tableResponse: ICategoryTable | undefined;
  tableData: ICategory[] = [];


  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._CategoryService.getAllCategory(this.pageSize, this.pageIndex, this.searchKey).subscribe({
      next: (response) => {
        console.log(response);
        this.tableResponse = response;
        this.tableData = response.data;
        console.log(this.tableData);
      }
    });
  }


  handlePageEvent(e: PageEvent) {

    this.pageEvent = e;
    //  totale number of recordes
    this.length = e.length;
    //  totale number of pages
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getCategories()
  }


  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if (result) {
        this.addCategory(result)
      }
    });
  }

  addCategory(data: string) {
    this._CategoryService.onAddCategory(data).subscribe({
      next: (res) => {
        console.log(res)
        this.message = res.name;
      }, error: (error) => {
        this.message = error.error.message;
        this._ToastrService.error(`error ${this.message} !`);
      }, complete: () => {
        this.getCategories();
        this._ToastrService.success(`The Category ( <span class="h4">${this.message}</span> ) was Added successfully`, '', {
          enableHtml: true
        });
      }
    })
  }

  openEditCategoryDialog(dataCategory: any): void {
    console.log(dataCategory)
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: dataCategory,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.editCategory(result, dataCategory.id)
      }
      console.log(result)
    });
  }

  editCategory(name: string, id: string) {
    this._CategoryService.onEditCategory(name, id).subscribe({
      next: (res) => {
        console.log(res)
        this.message = res.name;
      }, error: (error) => {
        this.message = error.error.message;
        this._ToastrService.error(`error ${this.message} !`);
      }, complete: () => {
        this.getCategories();
        this._ToastrService.success(`The Category ( <span class="h4">${this.message}</span> ) was Edited successfully`, '', {
          enableHtml: true // This allows HTML content to be rendered in the Toastr message
        });
      }
    })
  }


  openDeleteCategoryDialog(dataCategory: any): void {
    console.log(dataCategory)
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: dataCategory,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(dataCategory.id, dataCategory.name);
      if (result) {
        this.deleteCategory(result, dataCategory.name)
      }
      console.log(dataCategory.id, dataCategory.name);
    });
  }

  deleteCategory(categoryId: number, name: string) {
    this._CategoryService.onDeleteCategory(categoryId, name).subscribe({
      next: (res) => {
      }, error: (error) => {
        this.message = error.error.message;
        this._ToastrService.error(`error in deleted Pross!`);
      }, complete: () => {
        this.getCategories();
        this._ToastrService.success(`The Category was deleted successfully`);
      }
    })
  }


}


