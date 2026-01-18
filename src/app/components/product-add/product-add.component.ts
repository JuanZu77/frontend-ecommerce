import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {

  id: number= 0;
  code: string= "";
  name: string= "";
  description: string= "";
  price: number= 0;
  urlImage: string= "";
  userId: string= '1';
  categoryId: string= '1';

  constructor(private productService: ProductService) {

   }

  ngOnInit(): void {
    
  }

addProduct(): void {
  const formData = new FormData();

  // formData.append('id', String(this.id)); // <-- QUITAR
  formData.append('code', this.code ?? '');
  formData.append('name', this.name ?? '');
  formData.append('description', this.description ?? '');
  formData.append('price', String(this.price ?? 0));
  formData.append('urlImage', this.urlImage ?? '');
  formData.append('userId', String(this.userId));
  formData.append('categoryId', String(this.categoryId));

  this.productService.createProduct(formData).subscribe({
    next: (response) => console.log('Producto creado con éxito:', response),
    error: (err) => console.error('Error al crear el producto:', err),
  });
  }//cierra addProduct

}

