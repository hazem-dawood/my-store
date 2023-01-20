import { ProductModel } from "../product/product.model";

export class AddToCartModel {
    constructor(public product: ProductModel,public amount: number) {

    }
}