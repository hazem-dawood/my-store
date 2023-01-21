import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/Services/cartService";
import { AddToCartModel } from "src/app/models/cart/addToCart.model";
import { SuccessSubmitModel } from "src/app/models/cart/successSubmit.model";
import { ProductModel } from "src/app/models/product/product.model";
import Swal from "sweetalert2";

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
        var amount = parseInt((event.target as HTMLInputElement).value);
        this.cartService.updateProductAmount(addToCart, amount);
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

    removeProductFromCart(product: ProductModel) {
        Swal.fire({
            title: 'Are you sure want to remove?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this.listOfProductsInCart = this.cartService.removeProductFromCart(product.id);
                Swal.fire({
                    icon: "success",
                    text: "Deleted Successfully",
                    timer: 1500
                })
            }
        })
    }


    afterSubmit(fullName: string) {
        this.successSubmitModel.name = fullName;
        this.successSubmitModel.price = this.sumOfProductInCart;
        this.isCartFormSubmitted = true;
        this.cartService.resetCart();
    }
}