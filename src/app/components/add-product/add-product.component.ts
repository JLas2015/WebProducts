import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productFG!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private pService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.productFG = this.fb.group({
      name:[null, Validators.required],
      price:[null, Validators.required],
      quantity:[null, Validators.required],
      selected:[true, Validators.required],
      available:[true, Validators.required]
    });
  }

  onSaveProduct(){
    this.submitted = true;

    if(this.productFG.valid){
      this.pService.saveProduct(this.productFG.value).subscribe(data => {
        alert(`The product <${data.name}> is created`);
      });

      this.router.navigateByUrl('/products');
    }
  }

}
