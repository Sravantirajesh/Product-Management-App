import { Product } from '../../models/product';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: any;
}

export const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null
};