import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl: string = 'http://localhost:8080/api/v1/admin/products';

  constructor(private httpClient: HttpClient, private headerService: HeaderService) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl, { headers: this.headerService.getHeaders() });
  }

  createProduct(formData: FormData) {
  return this.httpClient.post<Product>(this.apiUrl, formData, { headers: this.headerService.getHeadersForFormData() });
}

  deleteProduct(id: number):Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`, { headers: this.headerService.getHeaders() });
  }

  getProductById(id: number):Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`, { headers: this.headerService.getHeaders() });
  }

  updateProduct(id: number, formData: FormData) {
  return this.httpClient.put<Product>(`${this.apiUrl}/${id}`, formData, { headers: this.headerService.getHeadersForFormData() });
  }




}

