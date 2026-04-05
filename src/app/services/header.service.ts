import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private token = '';
  public headers:HttpHeaders = new HttpHeaders();

  constructor(private sessionStorageService: SessionStorageService) { 

  
    if(this.sessionStorageService.getItem('token') != null) {
    
      this.token = this.sessionStorageService.getItem('token').token;
      this.headers = new HttpHeaders({
       //  'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    }
  }

}
