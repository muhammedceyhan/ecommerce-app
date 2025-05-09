import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Oturum açma / kayıt
import { LoginComponent } from './modules/auth/components/login/login.component';

import { RegisterComponent } from './modules/auth/components/register/register.component';

// Guards
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  // 1) Ana sayfa ürün listesi
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  // 2) Login / register
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 3) Auth modülü (oksurtiş guard’ı burada değil, login/register ayrı)
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  // 4) Ürünler — anonim lazy load
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/product/product.module').then((m) => m.ProductModule),
  },

  // 5) Sepet & ödeme — giriş zorunlu
  {
    path: 'cart',
    loadChildren: () =>
      import('./modules/cart/cart.module').then((m) => m.CartModule),
    canActivate: [AuthGuard],
  },

  // 6) Admin paneli — sadece ADMIN
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
  },

  // 6) seller module - sadece seller
  {
    path: 'seller',
    loadChildren: () =>
      import('./modules/seller/seller.module').then((m) => m.SellerModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'user-orders',
    loadChildren: () =>
      import('./modules/users-orders/users-orders.module').then((m) => m.UsersOrdersModule),
    canActivate: [AuthGuard],
  },
  {
  path: 'account',
  loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
  canActivate: [AuthGuard]
},
{
  path: 'payments',
  loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule),
  canActivate: [AuthGuard]
},
{
  path: 'favorites',
  loadChildren: () => import('./modules/favorites/favorites.module').then(m => m.FavoritesModule),
  canActivate: [AuthGuard]
},

  // 8) Aksi tüm yolları ana sayfaya at
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
