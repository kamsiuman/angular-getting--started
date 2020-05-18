export interface IProduct {
  productId: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

export class Product implements IProduct {
  constructor(
    public productCode: string,
    public productName: string,
    public releaseDate: string,
    public price: number,
    public description: string,
    public starRating: number,
    public imageUrl: string,
    public productId: number
  ) {}

  calculateDiscount(percent: number): number {
    return this.price - (this.price * percent) / 100;
  }
}
