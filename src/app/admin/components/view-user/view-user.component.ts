import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../model/user';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ICategoryTable } from '../../model/Category';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})

export class ViewUserComponent implements OnInit {

  userId: number = 0;
  userData: any;
  country: string = '';
  creationDate: any;
  email: string = '';
  roleInSystem: string = '';
  imagePath: string = '';
  phoneNumber: number = 0;
  userName: string = '';
  completImage: string = 'https://upskilling-egypt.com:3006/';
  notFoundRecipes: string = './assets/images/avatar.png';
  message: string = '';


  // !
  searchKey: string = '';

  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageNumber: number = 1;
  pageSizeOptions = [5, 10, 25];
  // pageEvent: PageEvent | any;
  // imagePath: string = 'https://upskilling-egypt.com/';
  // notFoundRecipes: string = './assets/images/avatar.png';


  tableResponse: ICategoryTable | undefined;
  tableData: IUser[] = [];


  // ngOnInit(): void {
  // }




  constructor(private _UsersService: UsersService, private _ActivatedRoute: ActivatedRoute, private _Router: Router, private dialog: MatDialog, private _ToastrService: ToastrService) {
    console.log(_ActivatedRoute.snapshot.params['id']);
    this.userId = _ActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getUsers();
    if (this.userId > 0) {
      this.getUserById(this.userId);
    }
  }

  getUserById(id: number) {
    this._UsersService.getUserById(id).subscribe({
      next: (response) => {
        console.log(response)
        this.userData = response;
        this.userName = response.userName;
        this.country = response.country;
        this.roleInSystem = response.group.name;
        this.email = response.email;
        this.imagePath = response.imagePath;
        this.phoneNumber = response.phoneNumber;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  goToUsers() {
    this._Router.navigate(['/dashboard/admin/users'])
  }


  getUsers() {
    let paramsApi = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      userName: this.searchKey
    }
    this._UsersService.getAllUsers(paramsApi).subscribe({
      next: (response) => {
        console.log(response.pageSize);
        this.tableResponse = response;
        this.tableData = response.data;
        console.log(this.tableData);
      }
    });
  }


  openDeleteUserDialog(dataRecipe: any): void {
    console.log(dataRecipe)
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: dataRecipe,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(dataRecipe.id, dataRecipe);
      if (result) {
        this.deleteUser(result, dataRecipe.userName)
      }
      console.log(dataRecipe.id, dataRecipe);
    });
  }


  deleteUser(userId: number, name: string) {
    this._UsersService.deleteUsers(userId, name).subscribe({
      next: (res) => {
      }, error: (error) => {
        this.message = error.error.message;
        this._ToastrService.error(`error in deleted Pross!`);
      }, complete: () => {
        this.getUsers();
        this._ToastrService.success(`The User was deleted successfully`);
        this._Router.navigate(['/dashboard/admin/users'])
      }
    })
  }



}
