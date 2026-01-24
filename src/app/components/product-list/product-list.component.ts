import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

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

  Swal.fire({
  title: "Está seguro que quiere eliminar el registro?",
  text: "",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Eliminar", 
  cancelButtonText: "Cancelar", 
}).then((result) => {
  if (result.isConfirmed) {

        this.productService.deleteProduct(productId).subscribe(
          () => {
            console.log(`Product with ID ${productId} deleted successfully.`);
            this.listProducts(); // Refresh the product list after deletion
          }
        );  

        Swal.fire({
          title: "Producto",
          text: "Producto Eliminado.",
          icon: "success"
        });
       }
     });

    
  }

}
