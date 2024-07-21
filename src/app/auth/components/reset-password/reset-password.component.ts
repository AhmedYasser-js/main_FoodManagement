import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { RegxPassword } from '../login/login.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  constructor(private _AuthService: AuthService, private _ToastrService: ToastrService, private _Router: Router, public _MatDialog: MatDialog) { }


  see: boolean = true;
  see_2: boolean = true;
  isLoading: boolean = false;
  password_type: string = 'text';
  // password_type: string = 'text';
  password_type_2: string = 'text';
  message: string = '"Welcome Again"';

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    seed: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(RegxPassword), Validators.maxLength(20), Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: this.passwordMatchValidator, }
  );

  passwordMatchValidator(control: any) {
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword')
    if (password.value == confirmPassword.value) {
      return null;
    } else {
      control
        .get('confirmPassword')
        ?.setErrors({ invalid: 'password and confirm password not match' });
      return { invalid: 'password and confirm password not match' };
    }
  }


  handleForm(data: FormGroup): void {
    this.isLoading = true;
    let userData = data.value;
    this._AuthService.ResetPassword(userData).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
      }, error: (err: any) => {
        console.log(err)
        this.isLoading = false;
        this._ToastrService.error(err.error.message, 'Error! ');
      }, complete: () => {
        this.isLoading = false;
        this._ToastrService.success(this.message, 'Done🤙✅');
        this._Router.navigate(['/auth/login'])
      },
    });
  }

  toggleSee() {
    this.see = !this.see;
    this.password_type = this.see ? 'text' : 'password';
  }

  toggleSee_2() {
    this.see_2 = !this.see_2;
    this.password_type_2 = this.see_2 ? 'text' : 'password';
  }


  routToRegister() {
    this._Router.navigate(['/auth/register'])
  }


}
