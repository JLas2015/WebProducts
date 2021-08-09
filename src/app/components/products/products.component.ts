import { AppDataState } from './../../models/app-data-state';
import { DataStateEnum } from './../../models/data-state-enum';
import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$?: Observable<AppDataState<Product[]>>;
  readonly dataStateEnum = DataStateEnum;

  constructor(private pService: ProductsService) { }

  ngOnInit(): void {
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
}
