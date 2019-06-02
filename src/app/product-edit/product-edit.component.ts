import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  _id: number;
  prod_name: string;
  prod_desc: string;
  prod_price: number = null;
  isLoading = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private formBuilder: FormBuilder) {
    
   }

  ngOnInit() {
    this.getProductDetails(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
     'prod_name': [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, Validators.required]
    });
  }

  getProductDetails(id) {
    this.api.getProduct(id).subscribe(data => {
      this._id = data.id;
      this.productForm.setValue({

        //TODO: When using real backend data we will need to change this to match the model
        prod_name: data.name,
        prod_desc: data.email,
        prod_price: data.username
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoading = true;
    this.api.updateProduct(this._id, form)
    .subscribe(res => {
      let id = res['id'];
      this.isLoading = false;
      this.router.navigate(['product-details', id]);
    }, (err) => {
      console.error(err);
      this.isLoading = false;
    });
  }
}
