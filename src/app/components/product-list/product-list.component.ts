import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
        //console.log('Products fetched successfully:', data);
      }
    );
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        console.log(`Product with ID ${productId} deleted successfully.`);
        this.listProducts(); // Refresh the product list after deletion
      }
    );  
  }

}
