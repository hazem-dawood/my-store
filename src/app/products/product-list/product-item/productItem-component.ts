import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AddToCartModel } from "src/app/models/cart/addToCart.model";
import { ProductModel } from "src/app/models/product/product.model";

@Component({
    selector: 'product-item',
    templateUrl: './productItem-component.html',
    styleUrls: ['./productItem-component.css']
})

export class ProductItemComponent {
    amount: number = 1;
    @Input() product: ProductModel = new ProductModel(0, '', 0, '', '');
    @Output() addToCart: EventEmitter<AddToCartModel> = new EventEmitter<AddToCartModel>();
    amountOptions: number[] = [];
    constructor() {
        for (var i = 1; i <= 15; i++) {
            this.amountOptions.push(i);
        }
    }

    addProductToCart() {
        this.addToCart.emit(new AddToCartModel(this.product, this.amount));
    }
}