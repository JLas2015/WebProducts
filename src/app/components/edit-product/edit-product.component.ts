import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId: number;
  productEditFG?: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private pService: ProductsService, private router: Router, 
              private activatedRoute: ActivatedRoute) { 
    this.productId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.pService.getProductById(this.productId).subscribe(product => {
      this.productEditFG = this.fb.group({
        id:[product.id, Validators.required],
        name:[product.name, Validators.required],
        price:[product.price, Validators.required],
        quantity:[product.quantity, Validators.required],
        selected:[product.selected, Validators.required],
        available:[product.available, Validators.required]
      });
    });
  }

  onEditProduct(){
    this.submitted = true;

    if(this.productEditFG?.valid){
      this.pService.editProduct(this.productEditFG.value).subscribe(data => {
        alert(`The product ${data.name} is updated`);
      });

      this.router.navigateByUrl('/products');
    }
  }
}
