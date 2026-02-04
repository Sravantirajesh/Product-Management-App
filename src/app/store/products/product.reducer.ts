import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { initialProductState } from './product.state';

export const productReducer = createReducer(
  initialProductState,

  /* Load */
  on(ProductActions.loadProducts, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products
  })),

  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  /* Add */
  on(ProductActions.addProduct, (state, { product }) => ({
    ...state,
    products: [...state.products, product]
  })),

  /*  Update */
   on(ProductActions.updateProduct, (state, { product }) => ({
    ...state,
    products: state.products.map(p =>
      p.id === product.id ? product : p
    )
  })),

  /*  Delete */
  on(ProductActions.deleteProduct, (state, { id }) => ({
    ...state,
    products: state.products.filter(p => p.id !== id)
  }))
);
