import { Injectable } from '@angular/core';
import { ItemCart } from '../common/item-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: Map<number, ItemCart> = new Map<number, ItemCart>();

  itemList: ItemCart[] = [];

  constructor() { }

  addItemCart(item: ItemCart): void { 
    if (this.items.has(item.id)) {
      const existingItem = this.items.get(item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
        this.items.set(item.id, existingItem);
      }
    } else {
      this.items.set(item.id, item);
    }
    this.updateItemList();
  }


  deleteItemCart(id: number): void {
    this.items.delete(id);
    this.updateItemList();
  } 

  totalCart(): number {
    let total = 0;  
    this.items.forEach(item => {
      total += item.getTotalPriceItem();
    });
    return total;
  }

  private updateItemList(): void {
  this.itemList.splice(0, this.itemList.length);
  this.items.forEach(item => this.itemList.push(item));
  }

  convertToListFromMap(): ItemCart[] {
    return Array.from(this.items.values());
  }

}