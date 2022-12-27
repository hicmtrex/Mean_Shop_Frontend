import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/views/authentication/login/login.component';
import { RegisterComponent } from './main/views/authentication/register/register.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layouts/main/mainlayout.module').then(
        (module) => module.MainlayoutModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./layouts/dashboard/dashboardlayout.module').then(
        (module) => module.DashboardlayoutModule
      ),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
