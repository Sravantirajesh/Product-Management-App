import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private jsonUrl = 'assets/products.json';

  constructor(private http: HttpClient) {}

  // Load all products
  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
      map(data =>
        data.map(item => ({
          id: item.id,
          name: item.title,
          description: item.description,
          cost: item.price,
          quantity: item.rating?.count ?? 0,
          rating: item.rating?.rate ?? 0,
          updatedDate: new Date()
        }))
      )
    );
  }


}
