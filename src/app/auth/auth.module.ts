import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { RegisterComponent } from './components/login/register/register.componentt
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { VerifyAcountComponent } from './components/verify-acount/verify-acount.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RequestResetPasswordComponent } from './components/request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
// import { ChangePasswordComponent } from './components/change-password/change-password.component';
// import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    VerifyAcountComponent,
    RequestResetPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    SharedModule,

  ]
})

export class AuthModule { }
