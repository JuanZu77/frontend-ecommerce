import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataPayment } from '../common/data-payment';
import { Observable } from 'rxjs';
import { UrlPaymentResponse } from '../common/url-payment-response';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl:string='http://localhost:8080/api/v1/payments'

  constructor(private http:HttpClient) { }

  getUrlPaypalPayment(dataPayment:DataPayment):Observable<UrlPaymentResponse>{

    return this.http.post<UrlPaymentResponse>(this.apiUrl, dataPayment);

  }
}
