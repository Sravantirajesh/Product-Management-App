import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import rawProducts from '../../assets/products.json';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  editableQuantity!: number;
  isUpdated = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const products = (rawProducts as any[]).map(p => ({
      id: p.id,
      name: p.title,
      description: p.description,
      cost: p.price,
      quantity: 1,
      rating: p.rating.rate,
      updatedDate: undefined
    }));

    this.product = products.find(p => p.id === id)!;
    this.editableQuantity = this.product.quantity;
  }

  onQuantityChange() {
    this.isUpdated = this.editableQuantity !== this.product.quantity;
  }

  updateQuantity() {
    this.product.quantity = this.editableQuantity;
    this.product.updatedDate = new Date();
    alert('Quantity updated successfully!');
    this.isUpdated = false;
  }
}
