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

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (error) => {
        if (error.status !== 401 && error.status !== 403) {
          console.error('Error al obtener productos:', error);
        }
      }
    });
  }

  deleteProduct(productId: number): void {
    Swal.fire({
      title: '¿Está seguro que quiere eliminar el registro?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe({
          next: () => {
            this.listProducts();

            Swal.fire({
              title: 'Producto',
              text: 'Producto eliminado.',
              icon: 'success'
            });
          },
          error: (error) => {
            console.error('Error al eliminar producto:', error);

            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el producto.',
              icon: 'error'
            });
          }
        });
      }
    });
  }
}