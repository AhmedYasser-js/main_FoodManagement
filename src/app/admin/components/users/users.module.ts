import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import { RecipesComponent } from './recipes.component';
// import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
