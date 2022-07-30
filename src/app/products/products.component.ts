import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { Store } from '@ngrx/store';
import { getProductsAction } from './state/products.actions';
import { getProductsSelector } from './state/products.selectors';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: any = this.store.select<any>(getProductsSelector);

  constructor(private store: Store, private productsService: ProductsService) {}

  ngOnInit() {
    this.getProducts();
  }

  addToCart(product: Product) {
    if (product) {
      let updatedProduct = {...product, cart: product.cart + 1};
      this.productsService.addToShoppingCart(updatedProduct).subscribe();
    }
  }

  getProducts() {
    this.productsService
      .getProducts()
      .subscribe((products: Product[]) => (this.store.dispatch(getProductsAction({ products }))));
  }
}
