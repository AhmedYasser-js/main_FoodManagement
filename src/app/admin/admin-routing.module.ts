import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './components/category/category.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { UsersComponent } from './components/users/users.component';
// import { ViewUserComponent } from './components/view-user/view-user.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'category', component: CategoryComponent, title: 'category' },
      // { path: 'category-test', component: CategoryTestComponent, title: 'category-test' },
      { path: 'recipes', loadChildren: () => import('../admin/components/recipes/recipes.module').then(m => m.RecipesModule), title: 'recipes' },
      { path: 'users', loadChildren: () => import('../admin/components/users/users.module').then(m => m.UsersModule), title: 'users' },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
