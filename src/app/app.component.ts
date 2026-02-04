import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductActions from './store/products/product.actions';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }
}
