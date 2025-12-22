import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl: string = 'http://localhost:8080/api/v1/admin/products';

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  createProduct(formData: FormData): Observable<any> {
  return this.httpClient.post<Product>(this.apiUrl, formData);
  }

  deleteProduct(id: number):Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

  getProductById(id: number):Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

  /*updateProduct(product: Product) {
    return this.httpClient.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }*/

}

