import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';
import { DetailProductComponent } from './components/cart/detail-product/detail-product.component';
import { SummaryOrderComponent } from './components/orders/summary-order/summary-order.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { RegistrationComponent } from './components/authentication/registration/registration.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin/product', component: ProductListComponent},
  {path: 'admin/product/add', component: ProductAddComponent},
  {path: 'admin/product/update/:id', component: ProductAddComponent},
  {path: 'admin/category', component: CategoryListComponent},
  {path: 'admin/category/add', component: CategoryAddComponent},
  {path: 'admin/category/update/:id', component: CategoryAddComponent },
  {path: 'cart/detailproduct/:id', component: DetailProductComponent },
  {path: 'cart/summary', component: SummaryOrderComponent, canActivate: [authGuard] },
  {path: 'payment/success', component: PaymentSuccessComponent },
  {path: 'user/register', component: RegistrationComponent },
  {path: 'user/login', component: LoginComponent },
  {path: 'logout', component: LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
