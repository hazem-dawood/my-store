import { Injectable } from "@angular/core";
import { AddToCartModel } from "../models/cart/addToCart.model";


@Injectable({
    providedIn: 'root',
})

export class CartService {
    // name of cart in local storage
    private readonly nameOfLocalStorage: string = 'cart';

    getCartProducts() {
        var arr: AddToCartModel[] = [];
        if (this.nameOfLocalStorage in localStorage) {
            arr = JSON.parse(localStorage.getItem(this.nameOfLocalStorage) + '');
        }
        return arr;
    }

    // add new item to cart
    addProductToCart(addToCart: AddToCartModel): boolean {
        var arr: AddToCartModel[] = [];
        if (this.nameOfLocalStorage in localStorage) {
            arr = JSON.parse(localStorage.getItem(this.nameOfLocalStorage) + '');
            var isProductExists = arr.filter(a => a.product.id == addToCart.product.id);
            if (isProductExists.length > 0) {
                let index = arr.indexOf(isProductExists[0]);
                arr.splice(index, 1, addToCart)
            } else {
                arr.push(addToCart);
            }
        } else {
            arr.push(addToCart);
        }
        localStorage.setItem(this.nameOfLocalStorage, JSON.stringify(arr));
        return true;
    }

    updateProductAmount(addToCart: AddToCartModel, amount: number) {
        addToCart.amount = amount;
        this.addProductToCart(addToCart);
    }

    resetCart(): void {
        if (this.nameOfLocalStorage in localStorage) {
            localStorage.removeItem(this.nameOfLocalStorage);
        }
    }
}