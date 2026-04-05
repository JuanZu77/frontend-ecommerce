import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private sessionStorageService: SessionStorageService) {}

  getHeaders(): HttpHeaders {
    const tokenData = this.sessionStorageService.getItem('token');

    if (!tokenData) {
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }

    const token = tokenData.token ? tokenData.token : tokenData;

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
  }

  getHeadersForFormData(): HttpHeaders {
    const tokenData = this.sessionStorageService.getItem('token');

    if (!tokenData) {
      return new HttpHeaders();
    }

    const token = tokenData.token ? tokenData.token : tokenData;

    return new HttpHeaders({
      'Authorization': token
    });
  }
}