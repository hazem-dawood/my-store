import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "src/app/Services/cartService";
import { ProductService } from "src/app/Services/productService";
import { AddToCartModel } from "src/app/models/cart/addToCart.model";
import { ProductModel } from "src/app/models/product/product.model";
import Swal from "sweetalert2";


@Component({
    selector: 'app-product-detail',
    templateUrl: './productDetail.component.html',
    styleUrls: ['./productDetail.component.css']
})

export class ProductDetailComponent implements OnInit, OnDestroy {
    amount: number = 1;
    product: ProductModel = new ProductModel(0, '', 0, '', '');
    amountOptions: number[] = [];
    id: number = 0;
    isLoading: boolean = true;
    isExistsInCart: AddToCartModel | null = null;

    constructor(private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
        private router: Router) {
        for (var i = 1; i <= 15; i++) {
            this.amountOptions.push(i);
        }
        var _id = this.route.snapshot.params['id'];
        if (!!_id && isNaN(_id) == false) {
            this.id = this.route.snapshot.params['id'];
            console.log(_id);
        } else {
            // empty id
            this.router.navigateByUrl('/');
        }
    }

    addToCart() {
        if (this.cartService.addProductToCart(new AddToCartModel(this.product, this.amount))) {
            this.isExistsInCart = this.cartService.getByProductId(this.product.id);
            Swal.fire({
                icon: 'success',
                title: 'Saved Successfully',
                showConfirmButton: false,
                timer: 1300
            });
        } else {
            Swal.fire('error occurred', '', 'error');
        }
    }

    ngOnInit(): void {
        this.productService.getAllProducts().subscribe((data) => {
            this.isLoading = false;
            var res = data.filter(a => a.id == this.id)
            if (res.length == 0) {
                // wrong id
                this.router.navigateByUrl('/');
            } else {
                this.product = res[0];
                this.isExistsInCart = this.cartService.getByProductId(this.product.id);
                if (this.isExistsInCart != null) {
                    this.amount = this.isExistsInCart.amount;
                }
            }
        }, (err) => {
            console.error(err);
            this.isLoading = false;
        });
    }

    ngOnDestroy(): void {

    }

    removeFromCart() {
        Swal.fire({
            title: 'Are you sure want to remove?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this.cartService.removeProductFromCart(this.product.id);
                this.isExistsInCart = null;
                Swal.fire({
                    icon: "success",
                    text: "Deleted Successfully",
                    timer: 1500
                })
            }
        })
    }

    updateAmount(event: Event) {
        if (this.isExistsInCart != null) {
            this.cartService.updateProductAmount(this.isExistsInCart, this.amount);
        }
    }
}