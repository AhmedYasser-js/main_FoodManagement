import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/admin/services/helper.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChangePasswordComponent } from '../../auth/components/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  message: string = '';

  constructor(private _AuthService: AuthService, private _HelperService: HelperService, private _Router: Router, private _MatDialog: MatDialog,
    private _ToastrService: ToastrService) { }


  // ngOnInit(): void {
  //   this.viewEdietUsers();
  // }


  userName = localStorage.getItem('userName');
  userRole = localStorage.getItem('userRole');


  myLogout() {
    this._AuthService.logout();
  }


  // /dashboard/home

  edietProfile() {
    this._Router.navigate(['/dashboard/edit_Profile']);
  }


  ChangePassword(data: any) {

    this._AuthService.ResetRequestPass(data).subscribe({
      next: (respones) => {
        console.log(respones)
      }, error: (error) => {
        console.log(error)
        this._ToastrService.error(error.error.message, 'Error!');

      }, complete: () => {
        console.log("succe")
        this._ToastrService.success(this.message, 'Request Reset successfuly');
        this._Router.navigate(['/auth/resetPassword'])
      }
    })
  }

  openDialog(): void {
    const dialogRef = this._MatDialog.open(ChangePasswordComponent, {
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      if (result != undefined) {
        this.ChangePassword(result)
      }
    });
  }

}
