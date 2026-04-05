import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastrService } from 'ngx-toastr';
import { Category } from '../../common/category';
import { CategoryService } from '../../services/category.service';
import { SessionStorageService } from '../../services/session-storage.service';


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
  user : number = 0;

  selectedFile: File | null = null;

  //agregar categorias
  categories : Category[] = [];

  constructor(
    private productService: ProductService, 
    private categoryService:CategoryService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private toastr:ToastrService,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
  this.getCategories();

  const userData = this.sessionStorageService.getItem('user');
  if (userData && userData.id) {
    this.user = Number(userData.id);
    this.userId = this.user.toString();
  }

  const idParam = this.activatedRoute.snapshot.paramMap.get('id');
  const id = Number(idParam);

  if (idParam && !Number.isNaN(id)) {
    this.id = id;
    this.getProductById(id);
  }
}


 addProduct(): void {
  const formData = new FormData();
  formData.append('code', this.code ?? '');
  formData.append('name', this.name ?? '');
  formData.append('description', this.description ?? '');
  formData.append('price', String(this.price ?? 0));
  formData.append('urlImage', this.urlImage ?? '');
  formData.append('userId', String(this.userId));
  formData.append('categoryId', String(this.categoryId));

  // Solo adjuntar imagen si el usuario seleccionó una
  if (this.selectedFile) {
    formData.append('image', this.selectedFile, this.selectedFile.name);
  }

  if (this.id && this.id > 0) {
    // UPDATE -> multipart/form-data
    this.productService.updateProduct(this.id, formData).subscribe({
      next: (res) => {
        console.log('Producto actualizado:', res);
        this.router.navigate(['/admin/product']);
      },
      error: (error) =>  {if (error.status !== 401 && error.status !== 403) {
        console.error('Error al actualizar:', error);
       }}
    });
  } else {
    // CREATE -> multipart/form-data
    this.productService.createProduct(formData).subscribe({
      next: (res) => {
        console.log('Producto creado:', res);

        //validacion Crear / Editar
        if(this.id == 0){
          this.toastr.success('El producto fue creado con éxito!', 'Producto Creado');
        }
        else{
          this.toastr.success('El producto fue actualizado con éxito!', 'Producto Actualizado');
        }
     
        this.router.navigate(['/admin/product']);
        
      },
      error: (error) => {if (error.status !== 401 && error.status !== 403) {
        console.error('Error al actualizar:', error);
       }}
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
    error: (error) => {if (error.status !== 401 && error.status !== 403) {
        console.error('Error al actualizar:', error);
       }}
  });
 }

    onFileSelected(event: any): void {
      const file: File = event.target.files[0];

      if (file) {
        this.selectedFile = file;
      } else {
        this.selectedFile = null;
      }   
      }
   
    getCategories(): void {
      this.categoryService.getCategoriesList().subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (error) => {
          if (error.status !== 401 && error.status !== 403) {
            console.log('There was an error!', error);
           }
        }
      });
    }

}