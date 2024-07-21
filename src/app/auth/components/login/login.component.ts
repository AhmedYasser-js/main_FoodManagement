import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';
import { MatDialog } from '@angular/material/dialog';

export const RegxPassword: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,20}$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent {

  constructor(private _AuthService: AuthService, private _ToastrService: ToastrService, private _Router: Router, public _MatDialog: MatDialog) { }

  see: boolean = true;
  isLoading: boolean = false;
  password_type: string = 'text';
  message: string = '"Welcome Again"';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(RegxPassword), Validators.maxLength(20), Validators.minLength(8)])
  })


  handleForm(data: FormGroup): void {
    this.isLoading = true;
    let userData = data.value;
    this._AuthService.onLogin(userData).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        localStorage.setItem('userToken', response.token)
        this._AuthService.getProfile();
        this._Router.navigate(['/dashboard'])

      }, error: (err: any) => {
        this.isLoading = false;

        console.log(err);
        this._ToastrService.error(err.error.message, 'Error ! ');
      },
      complete: () => {
        this.isLoading = false;
        this._Router.navigate(['/dashboard'])
        this._ToastrService.success(this.message, 'Hello');
      },
    });
  }

  toggleSee() {
    this.see = !this.see;
    this.password_type = this.see ? 'text' : 'password';
  }


  get passwordFormField() {
    return this.loginForm.get('password')?.errors?.['pattern'];
  }

  routToRegister() {
    this._Router.navigate(['/auth/register'])
  }

  // *SECTION == Reset Password

  openDialog(): void {
    const dialogRef = this._MatDialog.open(RequestResetPasswordComponent, {
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      if (result != undefined) {
        this.RequestResetPassword(result)
      }
    });
  }

  RequestResetPassword(data: any) {

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

}
