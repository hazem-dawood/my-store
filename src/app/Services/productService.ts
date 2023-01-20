import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product/product.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ProductService {
    constructor(private httpClient: HttpClient) { }

    // fetch all products
    getAllProducts(): Observable<ProductModel[]> {
        return this.httpClient.get<ProductModel[]>('/assets/data.json');
    }
}