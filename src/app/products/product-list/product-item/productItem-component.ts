import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CartService } from "src/app/Services/cartService";
import { AddToCartModel } from "src/app/models/cart/addToCart.model";
import { ProductModel } from "src/app/models/product/product.model";

@Component({
    selector: 'product-item',
    templateUrl: './productItem-component.html',
    styleUrls: ['./productItem-component.css']
})

export class ProductItemComponent implements OnInit {
    amount: number = 1;
    @Input() product: ProductModel = new ProductModel(0, '', 0, '', '');
    @Input() isExistsInCart: AddToCartModel | null = null;
    @Output() addToCart: EventEmitter<AddToCartModel> = new EventEmitter<AddToCartModel>();
    @Output() removeFromCart: EventEmitter<any> = new EventEmitter<number>();

    amountOptions: number[] = [];

    constructor(private cartService: CartService) {
        for (var i = 1; i <= 15; i++) {
            this.amountOptions.push(i);
        }
    }
    ngOnInit(): void {
        if (this.isExistsInCart != null) {
            this.amount = this.isExistsInCart.amount;
        }
    }

    updateAmount(event: Event) {
        if (this.isExistsInCart != null) {
            this.cartService.updateProductAmount(this.isExistsInCart, this.amount);
        }
    }

    addProductToCart() {
        var addToCart = new AddToCartModel(this.product, this.amount);
        this.isExistsInCart = addToCart;
        this.addToCart.emit(addToCart);
    }

    removeProductFromCart() {
        this.removeFromCart.emit(this.product.id);
    }
}