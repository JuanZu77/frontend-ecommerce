import { Component, OnInit } from '@angular/core';
import { ItemCart } from '../../../common/item-cart';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { OrderProduct } from '../../../common/order-product';
import { Order } from '../../../common/order';
import { OrderState } from '../../../common/order-state';
import { OrderService } from '../../../services/order.service';
import { PaymentService } from '../../../services/payment.service';
import { DataPayment } from '../../../common/data-payment';
import { SessionStorageService } from '../../../services/session-storage.service';

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

  constructor(private cartService: CartService, private userService: UserService, private orderService: OrderService, private paymentService:PaymentService, private sessionStorage:SessionStorageService) { }

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
            // agregar lógica adicional (como mostrar un mensaje de éxito o redirigir a otra página).
            
            this.sessionStorage.setItem('order', response);

          },
          error: (error) => {
            console.error('Error al crear la orden:', error);
            // agregar lógica para manejar errores 
          }
        });

        //Redireccion PAYPAL
        let urlPayment:string; //almacena url paypal autoriza
        let dataPayment =  new DataPayment('PAYPAL', this.totalCart.toString(), 'USD', 'COMPRA');

        this.paymentService.getUrlPaypalPayment(dataPayment).subscribe({
          next:(data:any)=>{
            urlPayment = data.url;
            console.log('Respuesta Exitosa'); 
            window.location.href = urlPayment; 
          },
          error: (error) => {
            console.error('Error al obtener el pago:', error);
          }
        });
      }

}
