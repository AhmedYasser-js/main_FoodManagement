import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.scss']
})
export class RequestResetPasswordComponent {

  constructor(public dialogRef: MatDialogRef<RequestResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public _MatDialog: MatDialog, private _Router: Router
  ) { }

  message: string = '"Welcome Again"';

  RequestResetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  })


  haveCode() {
    this._Router.navigate(['/auth/resetPassword'])
    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }



}
