import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/productList-component';
import { ProductDetailComponent } from './products/product-detail/productDetail.component';
import { CartListComponent } from './cart/cart-list/cartList.component';
const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'productDetail/:id', component: ProductDetailComponent },
  { path: 'productList', component: ProductListComponent },
  { path: 'cartList', component: CartListComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'productList' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
