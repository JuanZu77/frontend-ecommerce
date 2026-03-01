import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setItem(key: string, value: any) {
    if (this.isBrowser()) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string) {
    if (this.isBrowser()) {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }

  removeItem(key: string) {
    if (this.isBrowser()) {
      sessionStorage.removeItem(key);
    }
  }

  clear() {
    if (this.isBrowser()) {
      sessionStorage.clear();
    }
  }
}