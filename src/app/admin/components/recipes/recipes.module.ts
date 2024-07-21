import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipesComponent } from './recipes.component';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';
// import { ParagraphLessPipe } from 'src/app/pipes/paragraph-less.pipe';
// import { LessParagphPipe } from 'src/app/pipes/less-paragph.pipe';


@NgModule({
  declarations: [
    RecipesComponent,
    AddEditRecipeComponent,
    // ParagraphLessPipe,
    // LessParagphPipe
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule { }
