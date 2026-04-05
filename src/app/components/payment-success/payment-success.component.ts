import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { OrderState } from '../../common/order-state';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';



@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
  private orderService: OrderService,
  private sessionStorage: SessionStorageService,
  @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
  if (!isPlatformBrowser(this.platformId)) return; // 👈 evita SSR

  const order = this.sessionStorage.getItem('order');
  console.log('order raw:', order, 'href:', window.location.href);

  if (!order?.id) {
    console.warn('No hay order en sessionStorage (o falta id).');
    return;
  }

  const formData = new FormData();
  formData.append('id', String(order.id));
  formData.append('state', OrderState.CONFIRMED);

  this.orderService.updateOrder(formData).subscribe({
    next: (data) => {
      console.log('Orden confirmada:', data);
      this.sessionStorage.removeItem('order');
      
    },
    error: (err) => console.error('Error actualizando orden:', err),
  });
}


}
