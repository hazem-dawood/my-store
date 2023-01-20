import { Component, OnDestroy, OnInit } from "@angular/core";
import { CartService } from "src/app/Services/cartService";
import { ProductService } from "src/app/Services/productService";
import { ProductModel } from "src/app/models/product/product.model";

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

    constructor(private productService: ProductService,
        private cartService: CartService) { }

    ngOnInit(): void {
        this.productService.getAllProducts().subscribe((data) => {
            this.isLoading = false;
            this.products = data
        }, (err) => {
            console.error(err);
            this.isLoading = false;
        });
    }

    ngOnDestroy(): void {

    }

    addToCart(addToCart: any) {
        if (this.cartService.addProductToCart(addToCart)) {
            alert('added successfully');
        } else {
            alert('error aoocured');
        }
    }
}