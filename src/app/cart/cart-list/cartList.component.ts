import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CartService } from "src/app/Services/cartService";
import { AddToCartModel } from "src/app/models/cart/addToCart.model";
import { SuccessSubmitModel } from "src/app/models/cart/successSubmit.model";

@Component({
    selector: 'cart-list',
    templateUrl: './cartList.component.html',
    styleUrls: ['./cartList.component.css']
})

export class CartListComponent implements OnInit {
    isCartFormSubmitted: boolean = false;
    listOfProductsInCart: AddToCartModel[] = [];
    sumOfProductInCart: number = 0;
    successSubmitModel: SuccessSubmitModel = new SuccessSubmitModel('', 0);

    constructor(private cartService: CartService) {

    }

    ngOnInit(): void {
        this.loadCartPriducts();
    }

    updateCart(addToCart: AddToCartModel, event: Event) {
        var inpt = event.target as HTMLInputElement;
        this.cartService.updateProductAmount(addToCart, parseInt(inpt.value));
        // update cart,total
        this.loadCartPriducts();
    }

    private loadCartPriducts() {
        this.listOfProductsInCart = this.cartService.getCartProducts();
        this.sumOfProductInCart = this.getSumOfProductInCart();
    }

    private getSumOfProductInCart(): number {
        if (this.listOfProductsInCart.length == 0)
            return 0;
        return this.listOfProductsInCart.map(a => a.product.price * a.amount).reduce((a, b) => a + b, 0);
    }


    afterSubmit(fullName: string) {
        this.successSubmitModel.name = fullName;
        this.successSubmitModel.price = this.sumOfProductInCart;
        this.isCartFormSubmitted = true;
        this.cartService.resetCart();
    }
}