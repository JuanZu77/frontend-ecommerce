import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(private homeService: HomeService) { 

  }
  
  ngOnInit(): void {
    this.homeService.getProducts().subscribe(
      data => {
        this.products = data;
      }
    );
  }

}
