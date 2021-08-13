import { AppDataState } from './../../models/app-data-state';
import { DataStateEnum } from './../../models/data-state-enum';
import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$?: Observable<AppDataState<Product[]>>;
  readonly dataStateEnum = DataStateEnum;

  constructor(private pService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    // this.pService.getAllProducts().subscribe(data => {
    //   this.products = data;
    // }, error => {
    //   console.log(error);
    // });

    this.products$ = this.pService.getAllProducts()
                        .pipe(
                          map((data) => ({dataState: DataStateEnum.LOADED, data: data})),
                          startWith({dataState: DataStateEnum.LOADING}),
                          catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
                        );
  }

  getSelectedProducts(){
    this.products$ = this.pService.getSelectedProducts()
                        .pipe(
                          map((data) => ({dataState: DataStateEnum.LOADED, data: data})),
                          startWith({dataState: DataStateEnum.LOADING}),
                          catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
                        );
  }

  getAvailableProducts(){
    this.products$ = this.pService.getAvailableProducts()
                        .pipe(
                          map((data) => ({dataState: DataStateEnum.LOADED, data: data})),
                          startWith({dataState: DataStateEnum.LOADING}),
                          catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
                        );
  }

  onSearch(dataForm: any){
    this.products$ = this.pService.searchProducts(dataForm.keyword)
                        .pipe(
                          map((data) => ({dataState: DataStateEnum.LOADED, data: data})),
                          startWith({dataState: DataStateEnum.LOADING}),
                          catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
                        );
  }

  onSelect(product: Product){
    this.pService.selectProduct(product).subscribe();
  }

  onDelete(product: Product){
    let deleteConfirm = `Do you really want to delete the ${product.name} product`;
    if(confirm(deleteConfirm)){
      this.pService.deleteProduct(product).subscribe(() => {
        this.getAllProducts();
      });
    }
  }

  addProduct(){
    this.router.navigateByUrl("/addProduct");
  }

  onEditProduct(product: Product){    
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
