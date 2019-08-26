import { Component, EventEmitter, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    showImages: boolean = false;
    message: string;
    errorMessage: string;

    _filter: string;
    public get filter(): string {
        return this._filter;
    }
    public set filter(v: string) {
        this._filter = v;
    }

    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) {
        // not the best place for calling back end services
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: x => {
                console.log('Observer got a next value: ' + x);
                this.products = x;
                this.filteredProducts = this.products;
            },
            error: err => {
                console.error('Observer got an error: ' + err);
                this.errorMessage = err;
            },
            complete: () => console.log('Observer got a complete notification')
        });

    }

    toggleImages(): void {
        this.showImages = !this.showImages;
    }

    onRatingClicked(message: string): void {
        this.message = message;
    }
}