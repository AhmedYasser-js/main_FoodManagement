import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
// import { AdminComponent } from './admin.component';
// import { CategoryComponent } from './components/category/category.component';
// import { RecipesComponent } from './components/recipes/recipes.component';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path: 'add', component: AddEditRecipeComponent, title: 'add' },
  { path: 'edit/:id', component: AddEditRecipeComponent, title: 'edit' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
