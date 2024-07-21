import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './delete/delete.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ViewComponent } from './view/view.component';
import { LessParagphPipe } from '../pipes/less-paragph.pipe';
// import { ParagraphLessPipe } from '../pipes/paragraph-less.pipe';
// import { ChangePasswordComponent } from '../auth/components/change-password/change-password.component';
// import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    DeleteComponent,
    ViewComponent,
    // ChangePasswordComponent,
    LessParagphPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxDropzoneModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    NgxDropzoneModule,
    MatDialogModule,
    NavbarComponent,
    SidebarComponent,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule,
    DeleteComponent,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ViewComponent,
    LessParagphPipe
    // ChangePasswordComponent
  ]
})
export class SharedModule { }
