import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataPayment } from '../common/data-payment';
import { Observable } from 'rxjs';
import { UrlPaymentResponse } from '../common/url-payment-response';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl:string='http://localhost:8080/api/v1/payments'

  constructor(private http:HttpClient, private headerService: HeaderService) { }

  getUrlPaypalPayment(dataPayment:DataPayment):Observable<UrlPaymentResponse>{

    return this.http.post<UrlPaymentResponse>(this.apiUrl, dataPayment, { headers: this.headerService.headers });

  }
}
