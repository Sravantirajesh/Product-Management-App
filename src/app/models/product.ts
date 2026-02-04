export interface Product {
  id: number;
  name: string;
  description: string;
  cost: number;
  quantity: number;
  rating: number;
  updatedDate?: Date;
}