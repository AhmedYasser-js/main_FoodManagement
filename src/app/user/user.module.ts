import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { UserRecipesComponent } from './components/user-recipes/user-recipes.component';
import { SharedModule } from '../shared/shared.module';
// import { LessParagphPipe } from '../pipes/less-paragph.pipe';


@NgModule({
  declarations: [
    UserComponent,
    FavoritesComponent,
    UserRecipesComponent,
    // LessParagphPipe
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }
