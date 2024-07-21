import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { adminGuard } from '../Guards/admin.guard';
import { userGuard } from '../Guards/user.guard';
import { HomeComponent } from './components/home/home.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditProfComponent } from './components/edit-prof/edit-prof.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'home' },
      { path: 'edit_Profile', component: EditProfileComponent, title: 'edit_Profile' },
      { path: 'edit_Prof', component: EditProfComponent, title: 'edit_Prof' },
      { path: 'admin', canActivate: [adminGuard], loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule), title: 'user' },
      { path: 'auth', canActivate: [userGuard], loadChildren: () => import('../user/user.module').then(m => m.UserModule) },
      { path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserModule), title: 'user' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
