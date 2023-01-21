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
        this.updateLocalStorage(arr);
        return true;
    }

    getByProductId(productId: number): AddToCartModel | null {
        if (this.nameOfLocalStorage in localStorage) {
            var arr: AddToCartModel[] = JSON.parse(localStorage.getItem(this.nameOfLocalStorage) + '');
            var isProductExists = arr.filter(a => a.product.id == productId);
            if (isProductExists.length > 0) {
                return isProductExists[0];
            }
        }
        return null;
    }

    /**
     * update product amount 
     * @param addToCart AddToCartModel
     * @param amount number
     */
    updateProductAmount(addToCart: AddToCartModel, amount: number) {
        addToCart.amount = amount;
        this.addProductToCart(addToCart);
    }

    removeProductFromCart(productId: number): Array<AddToCartModel> {
        if (this.nameOfLocalStorage in localStorage) {
            var arr: AddToCartModel[] = JSON.parse(localStorage.getItem(this.nameOfLocalStorage) + '');
            var isProductExists = arr.filter(a => a.product.id == productId);
            if (isProductExists.length > 0) {
                // if got here then product exists => remove it
                arr.splice(arr.indexOf(isProductExists[0]), 1);
                this.updateLocalStorage(arr);
                return arr;
            }
        }
        return [];
    }

    /**
     * remove all data from cart
     */
    resetCart(): void {
        if (this.nameOfLocalStorage in localStorage) {
            localStorage.removeItem(this.nameOfLocalStorage);
        }
    }

    // save data in local storage
    private updateLocalStorage(arr: AddToCartModel[]) {
        localStorage.setItem(this.nameOfLocalStorage, JSON.stringify(arr));
    }
}