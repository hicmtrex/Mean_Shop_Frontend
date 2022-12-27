import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from 'src/app/dashboard/views/home-dashboard/home-dashboard.component';
import { AdminAuthGuard } from 'src/app/guards/admin-auth.guard';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        component: HomeDashboardComponent,
      },
      {
        path: 'products-list',
        loadChildren: () =>
          import('../../dashboard/views/products/products.module').then(
            (module) => module.ProductsModule
          ),
      },
      {
        path: 'orders-list',
        loadChildren: () =>
          import('../../dashboard/views/orders/orders.module').then(
            (module) => module.OrdersModule
          ),
      },
      {
        path: 'users-list',
        loadChildren: () =>
          import('../../dashboard/views/users/user.module').then(
            (module) => module.UserModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardlayoutRoutingModule {}
