import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Oturum açma / kayıt
import { LoginComponent } from './modules/auth/components/login/login.component';

import { RegisterComponent } from './modules/auth/components/register/register.component';

// Guards
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { SellerGuard } from './core/guards/seller.guard';
const routes: Routes = [
  // 1) Ana sayfa ürün listesi
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  // 2) Login / register
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 3) Auth modülü (oksurtiş guard’ı burada değil, login/register ayrı)
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },

  // 4) Ürünler — anonim lazy load
  { path: 'products', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule) },

  // 5) Sepet & ödeme — giriş zorunlu
  { path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule), canActivate: [AuthGuard] },

  // 6) Admin paneli — sadece ADMIN
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },

  // 6) seller module - sadece seller
  { path: 'seller', loadChildren: () => import('./modules/seller/seller.module').then(m => m.SellerModule), canActivate: [AuthGuard] },




  // 8) Aksi tüm yolları ana sayfaya at
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
