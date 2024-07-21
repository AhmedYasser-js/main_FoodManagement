import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserRecipesComponent } from './components/user-recipes/user-recipes.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'favorites', component: FavoritesComponent, title: 'favorites' },
  { path: 'user_Recipes', component: UserRecipesComponent, title: 'user_Recipes' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
