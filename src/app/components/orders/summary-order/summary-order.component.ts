import { Component, OnInit } from '@angular/core';
import { ItemCart } from '../../../common/item-cart';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { OrderProduct } from '../../../common/order-product';
import { Order } from '../../../common/order';
import { OrderState } from '../../../common/order-state';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-summary-order',
  templateUrl: './summary-order.component.html',
  styleUrls: ['./summary-order.component.css']
})

export class SummaryOrderComponent implements OnInit{

  items : ItemCart[] = [];
  totalCart : number = 0;
  firstName : string = '';
  lastName : string = '';
  email : string = '';
  address : string = '';

  orderProducts: OrderProduct[] = [];
  userId: number = 1; //dinamico cuando implemente login 

  constructor(private cartService: CartService, private userService: UserService, private orderService: OrderService) { }

      ngOnInit(): void {
        this.items = this.cartService.convertToListFromMap();
        this.totalCart = this.cartService.totalCart();

        this.getUserById(1); //dinamico cuando implemente login
      }

      deleteItemCart(productId: number) {
        this.cartService.deleteItemCart(productId);
        this.items = this.cartService.convertToListFromMap(); //actualiza
        this.totalCart = this.cartService.totalCart(); //actualiza
      }

      getUserById(id: number) {
        this.userService.getUsersById(id).subscribe({
          next: (response) => {
            this.firstName = response.firstName;
            this.lastName = response.lastName;
            this.email = response.email;
            this.address = response.address;  
          },
          error: (error) => {
            console.error('Error al obtener el usuario:', error);
          }
        }
        );
      }

      generateOrderProducts() {
        this.items.forEach(item => {
          const orderProduct = new OrderProduct(
            //item.id,
            null,
            item.productId,
            item.price,
            item.quantity
          );
          this.orderProducts.push(orderProduct);
        });  
        
        let order = new Order(
          null, //id
          new Date(),
          this.orderProducts,
          this.userId,
          OrderState.CANCELLED
        );

        this.orderService.createOrder(order).subscribe({
          next: (response) => {
            console.log('Orden creada:', response);
            // agregar lógica adicional después de crear la orden(como mostrar un mensaje de éxito o redirigir a otra página).
          },
          error: (error) => {
            console.error('Error al crear la orden:', error);
            // agregar lógica para manejar errores o como mostrar un mensaje de error al usuario.
          }
        });
      }

}
