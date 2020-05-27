import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  // selector: 'pm-products',
  // linked template
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product list!';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  // listFilter = 'cart';
  private _listFilter: string;
  private _productService;
  private errorMessage: string;

  constructor(private productService: ProductService) {
    this.listFilter = 'cart';
    this._productService = productService;
  }

  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    this.filterProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  filterProducts: IProduct[] = [];
  products: IProduct[] = [];

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  toogleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  ngOnInit() {
    console.log('Inside Onit');
    this._productService.getProductAsync().subscribe({
      next: products => {
        this.products = products;
        this.filterProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }
}
