import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product';

export const loadProducts = createAction('[Product] Load');

export const loadProductsSuccess = createAction(
  '[Product] Load Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Failure',
  props<{ error: any }>()
);

export const addProduct = createAction(
  '[Product] Add',
  props<{ product: Product }>()
);

/*  UI Update */
export const updateProduct = createAction(
  '[Product] Update',
  props<{ product: Product }>()
);

/*  UI Delete */
export const deleteProduct = createAction(
  '[Product] Delete',
  props<{ id: number }>()
);
