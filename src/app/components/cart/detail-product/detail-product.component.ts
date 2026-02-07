import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ItemCart } from '../../../common/item-cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent implements OnInit {

  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  urlImage: string = '';
  quantity: number = 0;

    constructor(private productService: ProductService, private route: ActivatedRoute, private cartService:CartService, private toastr: ToastrService) { }

    ngOnInit(): void {
      const idParam = this.route.snapshot.paramMap.get('id');
      const id = idParam ? Number(idParam) : 0;

      if (id > 0) {
        this.getProductById(id);
      }
    }

    getProductById(id: number): void {
      this.productService.getProductById(id).subscribe(product => {
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.urlImage = product.urlImage;
      });
    }


    addToCart(): void {
      if (this.quantity > 0) {
        const item = new ItemCart(
          this.id,
          this.name,
          this.price,
          this.quantity
        );

        this.cartService.addItemCart(item);

        alert(`${this.quantity} of ${this.name} id ${this.id} added to cart.`);
        console.log(`${this.quantity} of ${this.name} id ${this.id} added to cart.`)
        console.log(`${this.cartService.totalCart()} items in cart.`);
      } else {
        alert('Please enter a valid quantity.');
      }

      this.toastr.success('Producto añadido al carrito de compras!', 'Carrito Compras');
    }

}
