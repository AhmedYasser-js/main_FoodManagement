import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/admin/services/helper.service';
import { RegxPassword } from 'src/app/auth/components/login/login.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  userData: any;
  country: string = '';
  creationDate: any;
  modificationDate: any;
  email: string = '';
  roleInSystem: string = '';
  imagePath: string = '';
  phoneNumber: number = 0;
  userName: string = '';
  completImage: string = 'https://upskilling-egypt.com/';
  notFoundRecipes: string = './assets/images/avatar.png';
  message: string = '';
  imgSrc: any;
  files: File[] = [];


  constructor(private _HelperService: HelperService, private _Router: Router, private _AuthService: AuthService, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.viewEdietUsers();
  }

  viewEdietUsers() {
    this._HelperService.viewEdietUsers().subscribe({
      next: (response) => {
        console.log(response)
        this.userData = response;
        this.userName = response.userName;
        this.country = response.country;
        this.roleInSystem = response.group.name;
        this.email = response.email;
        this.imagePath = response.imagePath;
        this.phoneNumber = response.phoneNumber;
        this.creationDate = response.creationDate;
        this.modificationDate = response.modificationDate;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  editeProfile() {
    this._Router.navigate(['/dashboard/edit_Prof'])
  }


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
    // this.isLoading = true;
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
          // this.isLoading = false;
          console.log(response);

        },
        error: (err: any) => {
          // this.isLoading = false;
          console.log(err);
          this._ToastrService.error(err.error.message, 'Error! ');
        },
        complete: () => {
          // this.isLoading = false;
          this._ToastrService.success(this.message, 'Register Successfuly');
          // this.openDialog();
        },
      });
    }
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



}
