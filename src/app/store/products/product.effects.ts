import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { ProductService } from '../../services/product.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.service.getProducts().pipe(
          map(products =>
            ProductActions.loadProductsSuccess({ products })
          ),
          catchError(error =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: ProductService
  ) {}
}
