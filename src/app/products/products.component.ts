import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['prod_name', 'prod_price'];
  data: Product[] = [];
  isLoading = true;
  constructor(private api: ApiService) { }

  ngOnInit() {
    //get the products and subscribe to the result
    this.api.getProducts()
    .subscribe(res => {
      this.data = res;

      //debug
      console.log(this.data);
      this.isLoading = false;

    }, err => {
      
      console.error(err);
      this.isLoading = false;
    
    });
  }
}
