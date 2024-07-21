import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { VerifyAcountComponent } from '../verify-acount/verify-acount.component';
import { MatDialog } from '@angular/material/dialog';
// import{NgxD}

export const RegxPassword: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,20}$/;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  constructor(private _AuthService: AuthService, private _ToastrService: ToastrService, private _Router: Router, public _MatDialog: MatDialog) { }



  see: boolean = true;
  see_2: boolean = true;
  password_type: string = 'text';
  password_type_2: string = 'text';
  isLoading: boolean = false;
  message: string = '"Welcome in Food Recipe"';

  files: File[] = []
  imgSrc: any;

  RegisterForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
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

  handleForm(): void {
    this.isLoading = true;
    let userData = this.RegisterForm.value;

    let myData = new FormData();

    myData.append('userName', userData.userName)
    myData.append('email', userData.email)
    myData.append('country', userData.country)
    myData.append('phoneNumber', userData.phoneNumber)
    myData.append('password', userData.password)
    myData.append('confirmPassword', userData.confirmPassword)
    myData.append('profileImage', this.imgSrc)

    console.log(myData.get('userName'));
    console.log(myData.get('email'));
    console.log(myData.get('country'));
    console.log(myData.get('phoneNumber'));
    console.log(myData.get('password'));
    console.log(myData.get('confirmPassword'));
    console.log(myData.get('profileImage'));


    if (this.RegisterForm.valid) {
      this._AuthService.onRegister(userData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);

        },
        error: (err: any) => {
          this.isLoading = false;
          console.log(err);
          this._ToastrService.error(err.error.message, 'Error! ');
        },
        complete: () => {
          this.isLoading = false;
          this._ToastrService.success(this.message, 'Register Successfuly');
          this.openDialog();
        },
      });
    }
  }

  toggleSee() {
    this.see = !this.see;
    this.password_type = this.see ? 'text' : 'password';
  }

  toggleSee_2() {
    this.see_2 = !this.see_2;
    this.password_type_2 = this.see_2 ? 'text' : 'password';
  }

  routToLogin() {
    this._Router.navigate(['/auth/login'])
  }

  onSelect(event: any) {
    console.log(event);
    this.imgSrc = event.addedFiles[0];
    console.log(this.imgSrc)
    this.files.push(...event.addedFiles)
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1)
  }

  openDialog(): void {
    const dialogRef = this._MatDialog.open(VerifyAcountComponent, {
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      if (result != undefined) {
        this.onVerifyAcount_2(result)
      }
    });
  }


  onVerifyAcount_2(data: any) {
    // console.log(data)
    this._AuthService.onVerify(data).subscribe({
      next: (respones) => {
        console.log(respones)
      }, error: (error) => {
        console.log(error)
        this._ToastrService.error(error.error.message, 'Error!');

      }, complete: () => {
        console.log("succe")
        this._ToastrService.success(this.message, 'Account Activetied successfuly');
        this._Router.navigate(['/auth/login'])
      }
    })
  }



  //   onVerifyAcount(data: any) {
  //   this._AuthService.onVerify(data).subscribe({
  //     next: (resppone) => {
  //       console.log(resppone)
  //       resppone = this.verifyCount;
  //     }, error: (error) => {
  //       this._ToastrService.error(error.error.message, 'Error!');
  //     }, complete: () => {
  //       this._ToastrService.success(this.message, 'Account Activetied successfuly');
  //       this.dialogRef.close();
  //       this._Router.navigate(['auth/login'])
  //     }
  //   })
  // }




































  // files: File[] = [];

  // onFilesAdded(event: any) {
  //   console.log(event);
  //   this.files.push(...event.addedFiles);
  // }

  // onFilesRejected(event: any) {
  //   console.log(event);
  // }

  // onRemove(event) {
  //   console.log(event);
  //   this.files.splice(this.files.indexOf(event), 1);
  // }













}
