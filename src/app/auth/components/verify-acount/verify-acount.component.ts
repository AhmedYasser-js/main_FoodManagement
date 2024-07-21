import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-verify-acount',
  templateUrl: './verify-acount.component.html',
  styleUrls: ['./verify-acount.component.scss']
})

export class VerifyAcountComponent {
  constructor(public dialogRef: MatDialogRef<VerifyAcountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public _MatDialog: MatDialog
  ) { }

  message: string = '"Welcome Again"';
  verifyCount: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    code: new FormControl(null, [Validators.required, Validators.minLength(4)])
  })

  onNoClick() {
    this.dialogRef.close();
  }

  // openDialog(): void {
  //   const dialogRef = this._MatDialog.open(VerifyAcountComponent, {
  //     data: { name: '' },
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed', result);

  //   });
  // }

  // onVerifyAcount(data: any) {
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



}


