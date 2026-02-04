import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';

import { productReducer } from './store/products/product.reducer';
import { ProductEffects } from './store/products/product.effects';
import { AgGridModule } from 'ag-grid-angular';
import { UppercaseDirective } from './directives/uppercase.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductViewComponent,
    UppercaseDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,              
    ReactiveFormsModule,    
    AgGridModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'product/:id', component: ProductViewComponent }
    ]),

    StoreModule.forRoot({ products: productReducer }),
    EffectsModule.forRoot([ProductEffects])
  ],
  bootstrap: [AppComponent]   
})
export class AppModule {}
