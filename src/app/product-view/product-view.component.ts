import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { Product } from '../models/product';
import * as ProductActions from '../store/products/product.actions';
import { selectAllProducts } from '../store/products/product.selectors';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product!: Product;
  editableQuantity!: number;
  isUpdated = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.store.select(selectAllProducts)
      .pipe(map(products => products.find(p => p.id === id)))
      .subscribe(product => {
        if (product) {
          this.product = product;
          this.editableQuantity = product.quantity;
          this.isUpdated = false;
        }
      });
  }

  onQuantityChange() {
    this.isUpdated = this.editableQuantity !== this.product.quantity;
  }

  updateQuantity() {
  this.store.dispatch(
    ProductActions.updateProduct({
      product: {
        ...this.product,
        quantity: this.editableQuantity,
        updatedDate: new Date()
      }
    })
  );

  alert(` Quantity updated for "${this.product.name}"`);
  this.isUpdated = false;
}
}
