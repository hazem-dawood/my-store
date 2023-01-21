import { Component, OnDestroy, OnInit } from "@angular/core";
import { CartService } from "src/app/Services/cartService";
import { ProductService } from "src/app/Services/productService";
import { AddToCartModel } from "src/app/models/cart/addToCart.model";
import { ProductModel } from "src/app/models/product/product.model";
import Swal from "sweetalert2";

@Component({
    selector: 'product-list',
    templateUrl: './productList-component.html',
    styleUrls: ['./productList-component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
    // still true untill products loaded
    isLoading: boolean = true;
    // will fetch all products from the server
    products: ProductModel[] = [];
    cartProducts: AddToCartModel[] = [];

    constructor(private productService: ProductService,
        private cartService: CartService) { }

    ngOnInit(): void {
        this.productService.getAllProducts().subscribe((data) => {
            this.isLoading = false;
            this.products = data
        }, (err) => {
            Swal.fire('error occurred While trying to load data', '', 'error');
            console.error(err);
            this.isLoading = false;
        });

        this.cartProducts = this.cartService.getCartProducts();
    }

    ngOnDestroy(): void {

    }

    addToCart(addToCart: AddToCartModel) {
        if (this.cartService.addProductToCart(addToCart)) {
            Swal.fire({
                icon: 'success',
                title: 'Added Successfully',
                timer: 1300
            });
        } else {
            Swal.fire('error occurred', '', 'error');
        }
    }

    removeFromCart(id: number) {
        Swal.fire({
            title: 'Are you sure want to remove?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this.cartProducts = this.cartService.removeProductFromCart(id);
                Swal.fire({
                    icon: "success",
                    text: "Deleted Successfully",
                    timer: 1500
                })
            }
        })
    }

    isProductExistsInCart(productId: number): AddToCartModel | null {
        var p = this.cartProducts.filter(a => a.product.id == productId)
        if (p.length > 0) return p[0];
        return null;
    }
}