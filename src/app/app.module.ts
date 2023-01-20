import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/productList-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductItemComponent } from './products/product-list/product-item/productItem-component';
import { AppRoutingModule } from './app-route';
import { BrowserModule } from '@angular/platform-browser';
import { ProductDetailComponent } from './products/product-detail/productDetail.component';
import { NavBarComponent } from './Layout/nav-bar/navbar.component';
import { CartListComponent } from './cart/cart-list/cartList.component';
import { SubmitCartComponent } from './cart/submit-cart/submitCart.component';
import { SuccessSubmitComponent } from './cart/success-submit/successSubmit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailComponent,
    CartListComponent,
    SubmitCartComponent,
    SuccessSubmitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
