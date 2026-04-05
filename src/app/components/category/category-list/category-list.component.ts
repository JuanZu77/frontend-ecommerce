import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  categories: any[] = [];
  
  constructor(private categoryService: CategoryService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.listCategories();
  }

    listCategories(): void {
      this.categoryService.getCategoriesList().subscribe({
        next: (data: any[]) => {
          this.categories = data;
        },
        error: (error: any) => {
          //this.toastr.error('Error fetching categories', 'Error');
           if (error.status !== 401 && error.status !== 403) {
            console.log('There was an error!', error);
           }
          
        }
      });
    }

  deleteCategory(id: number): void {
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

              this.categoryService.deleleteCategoryById(id).subscribe(
                () => {
                  console.log(`Categoría with ID ${this.categories} deleted successfully.`);
                  this.listCategories(); // Refresh the product list after deletion
                }
              );  

              Swal.fire({
                title: "Categoraía",
                text: "Categoría Eliminada.",
                icon: "success"
              });
            }
          });
        }

}
