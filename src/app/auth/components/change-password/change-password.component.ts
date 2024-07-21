import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegxPassword } from 'src/app/auth/components/login/login.component';
import { AuthService } from 'src/app/auth/services/auth.service';
// ReactiveFormsModule

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {


  constructor(private _AuthService: AuthService, private _ToastrService: ToastrService, private _Router: Router, public _MatDialog: MatDialog) {
  }


  see: boolean = true;
  see_2: boolean = true;
  see_3: boolean = true;
  isLoading: boolean = false;
  password_type: string = 'text';
  // password_type: string = 'text';
  password_type_2: string = 'text';
  password_type_3: string = 'text';
  message: string = '"Welcome Again"';

  changePassword: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required, Validators.pattern(RegxPassword), Validators.maxLength(20), Validators.minLength(8)]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(RegxPassword), Validators.maxLength(20), Validators.minLength(8)]),
    confirmNewPassword: new FormControl(null, [Validators.required, Validators.pattern(RegxPassword), Validators.maxLength(20), Validators.minLength(8)]),
  });

  handleForm(data: FormGroup): void {
    this.isLoading = true;
    let userData = data.value;
    this._AuthService.onChangePassword(userData).subscribe({
      next: (response) => {
        console.log(response);
      }, error: (err: any) => {
        console.log(err)
        this._ToastrService.error(err.error.message, 'Error! ');
      }, complete: () => {
        this._ToastrService.success(this.message, 'Done🤙✅');
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

  toggleSee_3() {
    this.see_3 = !this.see_3;
    this.password_type_3 = this.see_3 ? 'text' : 'password';
  }


  routToRegister() {
    this._Router.navigate(['/auth/register'])
  }


}
