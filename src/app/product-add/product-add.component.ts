import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productForm: FormGroup;
  prod_name: string = '';
  prod_desc: string = '';
  prod_price: string = null;
  update_at: Date = null;
  isLoading = false;

  constructor(private api: ApiService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log('Product add here');

    this.productForm = this.formBuilder.group({
      'prod_name': [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoading = true;
    this.api.addProduct(form)
    .subscribe(res => {
      let id = res['id'];
      this.isLoading = false;
      this.router.navigate(['/product-details', id]);
    }, (err) => {
      console.error(err);
      this.isLoading = false;
    });
  }
}
