import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { DashboardComponent } from './modules/admin/components/dashboard/dashboard.component';
import { ProductListAdminComponent } from './modules/admin/components/product-list-admin/product-list-admin.component';
import { ProductCreateComponent } from './modules/admin/components/product-create/product-create.component';
import { ProductEditComponent } from './modules/admin/components/product-edit/product-edit.component';
import { CartPageComponent } from './modules/cart/cart-page/cart-page.component';
import { CheckoutComponent } from './modules/cart/checkout/checkout.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';

// Define routes here
const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },  // Default path
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  // Admin routes protected by AdminGuard
  { path: 'admin', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin/products', component: ProductListAdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/products/create', component: ProductCreateComponent, canActivate: [AdminGuard] },
  { path: 'admin/products/edit/:id', component: ProductEditComponent, canActivate: [AdminGuard] },

  // Cart routes
  { path: 'cart', component: CartPageComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
