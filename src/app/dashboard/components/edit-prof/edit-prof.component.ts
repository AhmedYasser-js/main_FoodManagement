import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegxPassword } from 'src/app/auth/components/login/login.component';
import { VerifyAcountComponent } from 'src/app/auth/components/verify-acount/verify-acount.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-edit-prof',
  templateUrl: './edit-prof.component.html',
  styleUrls: ['./edit-prof.component.scss']
})
export class EditProfComponent implements OnInit {
  see: boolean = true;
  see_2: boolean = true;
  password_type: string = 'text';
  password_type_2: string = 'text';
  isLoading: boolean = false;
  message: string = '"Welcome in Food Recipe"';
  userId: number = 0;
  imgUrl: string = 'https://upskilling-egypt.com/';
  imagePath: any;
  userData: any;
  imgSrc: File | null = null;
  files: File[] = [];
  hide: boolean = true;
  confirmHide: boolean = true;

  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    public _MatDialog: MatDialog
  ) { }

  ngOnInit(): void {   
    this.getUserById();
  }

  profileForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(20),
      Validators.pattern('^(?=.*?[a-z])(?=.*?[a-z])(?=.*?[0-9]).{3,20}$')
    ]),
    imagePath: new FormControl(null, []),
    country: new FormControl('', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(20)
    ]),
    email: new FormControl('', [
      Validators.required, 
      Validators.email
    ]),
    phoneNumber: new FormControl('', [
      Validators.required
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required
    ])
  });

  handleForm(data: FormGroup): void {
    let myData = new FormData();
    myData.append('userName', data.value.userName);
    myData.append('email', data.value.email);
    myData.append('phoneNumber', data.value.phoneNumber);
    myData.append('country', data.value.country);
    myData.append('confirmPassword', data.value.confirmPassword);

    if (this.imgSrc) {
      myData.append('imagePath', this.imgSrc, this.imgSrc.name);
    }

    this._AuthService.onEditUser(this.userId, myData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {
        // Handle error
      },
      complete: () => {
        this._ToastrService.success('Edited Successful');
        this._Router.navigate(['/dashboard/home']);
      }
    });
  }

  toggleSee(): void {
    this.see = !this.see;
    this.password_type = this.see ? 'text' : 'password';
  }

  toggleSee_2(): void {
    this.see_2 = !this.see_2;
    this.password_type_2 = this.see_2 ? 'text' : 'password';
  }

  routToLogin(): void {
    this._Router.navigate(['/auth/login']);
  }

  onSelect(event: any): void {
    console.log(event);
    this.imgSrc = event.addedFiles[0];
    console.log(this.imgSrc);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any): void {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  getUserById(): void {
    this._AuthService.getCurrentUser().subscribe({
      next: (res) => {
        this.userId = res.id;
        this.userData = res;
      },
      error: () => {
        // Handle error
      },
      complete: () => {
        // this.imgSrc = this.imgUrl + this.userData.imagePath;
        this.profileForm.patchValue({
          userName: this.userData.userName,
          country: this.userData.country,
          phoneNumber: this.userData.phoneNumber,
          email: this.userData.email,
          confirmPassword: this.userData.confirmPassword,
          imagePath: this.userData.imagePath,
        });
      }
    });
  }
}