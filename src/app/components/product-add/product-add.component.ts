import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {

  id: number= 0;
  code: string= "001";
  name: string= "";
  description: string= "";
  price: number= 0;
  urlImage: string= "";
  userId: string= '1';
  categoryId: string= '1';

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {

   }


ngOnInit(): void {
  const idParam = this.activatedRoute.snapshot.paramMap.get('id');
  const id = Number(idParam);

  if (!idParam || Number.isNaN(id)) return;

  this.id = id;              // <- CLAVE
  this.getProductById(id);   // <- CLAVE (si estás editando)
}



addProduct(): void {
  if (this.id && this.id > 0) {
    // UPDATE -> JSON (RequestBody)
    const product = {
      id: this.id,
      code: this.code ?? '',
      name: this.name ?? '',
      description: this.description ?? '',
      price: this.price ?? 0,
      urlImage: this.urlImage ?? '',
      userId: Number(this.userId),
      categoryId: Number(this.categoryId),
    };

    this.productService.updateProduct(this.id, product).subscribe({
      next: (res) => {
        console.log('Producto actualizado:', res);
        this.router.navigate(['/admin/product']);
      },
      error: (err) => console.error('Error al actualizar:', err),
    });

  } else {
    // create: dejar FormData si mantengo el POST con RequestParam
    const formData = new FormData();
    formData.append('code', this.code ?? '');
    formData.append('name', this.name ?? '');
    formData.append('description', this.description ?? '');
    formData.append('price', String(this.price ?? 0));
    formData.append('urlImage', this.urlImage ?? '');
    formData.append('userId', String(this.userId));
    formData.append('categoryId', String(this.categoryId));

    this.productService.createProduct(formData).subscribe({
      next: (res) => {
        console.log('Producto creado:', res);
        this.router.navigate(['/admin/product']);
      },
      error: (err) => console.error('Error al crear:', err),
    });
  }
} //addProduct


getProductById(id: number): void {
  this.productService.getProductById(id).subscribe({
    next: (product) => {
      if (!product) {
        console.error('Producto no encontrado:', id);
        return;
      }
      this.id = product.id;
      this.code = product.code;
      this.name = product.name;
      this.description = product.description;
      this.price = product.price;
      this.urlImage = product.urlImage;
      this.userId = String(product.userId);
      this.categoryId = String(product.categoryId);
    },
    error: (err) => console.error('Error cargando producto', err)
  });
}


}