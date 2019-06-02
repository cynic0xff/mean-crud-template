import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  product: Product = { id: 0, prod_name: '', prod_desc: '', prod_price: null, updated_at: null }
  isLoading = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
    
   }

  ngOnInit() {
    this.getProductDetails(this.route.snapshot.params['id']);
  }

  getProductDetails(id) {
    this.api.getProduct(id)
    .subscribe(res => {
      this.product = res

      console.log(this.product);
      this.isLoading = false;
    });
  }

}
