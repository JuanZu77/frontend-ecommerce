import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../common/category';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent implements OnInit {

      id?: number;
      name: string = '';
 
      constructor(
        private categoryService: CategoryService,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute
      ) { }
      
      ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        const id = Number(idParam);

        if (idParam && !Number.isNaN(id)) {
          this.id = id;
          this.getCategoryById(id);
        }
      }


      addCategory(): void {
       if (!this.name) {
    this.toastr.error('Category name is required', 'Error');
    return;
  }

  const payload: Category = { name: this.name };

  if (this.id != null) {
    this.categoryService.updateCategory(this.id, payload).subscribe({
      next: () => {
        this.toastr.success('Categoría actualizada correctamente', 'OK');
        this.router.navigate(['admin/category']);
      },
      error: (err) => {
        this.toastr.error('Error al actualizar categoría', 'Error');
        console.error(err);
      }
    });
  } else {
    this.categoryService.createCategory(payload).subscribe({
      next: () => {
        this.toastr.success('Categoría registrada correctamente', 'OK');
        this.router.navigate(['admin/category']);
      },
      error: (err) => {
        this.toastr.error('Error al registrar categoría', 'Error');
        console.error(err);
      }
     });
    }
  }

    getCategoryById(id: number): void {
      this.categoryService.getCategoryById(id).subscribe({
        next: (cat) => {
          this.id = cat.id ?? id;
          this.name = cat.name;
        },
        error: (err) => {
          this.toastr.error('Error cargando categoría', 'Error');
          console.error(err);
        }
      });
    }


}
