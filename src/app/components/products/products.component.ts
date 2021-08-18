import { AppDataState } from './../../models/app-data-state';
import { DataStateEnum, ProductEvents } from './../../models/data-state-enum';
import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductActionEvent } from 'src/app/models/product-event';
import { EventDriverService } from 'src/app/services/event-driver.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$?: Observable<AppDataState<Product[]>>;
  readonly dataStateEnum = DataStateEnum;


  constructor(private pService: ProductsService, private router: Router, private edService: EventDriverService) { }

  ngOnInit(): void {
    this.getAllProducts();

    this.edService.sourceEventSubjectObservable.subscribe((actionEvent: ProductActionEvent) => {
      switch (actionEvent.type) {
        // From ProductNav
        case ProductEvents.SELECTED:
          this.getSelectedProducts();
          break;        
        case ProductEvents.SEARCH:
          this.onSearch(actionEvent.payload);
          break;
        // From ProductList
        case ProductEvents.EDIT:
          this.onEditProduct(actionEvent.payload);
          break;
        case ProductEvents.SET_AVAILAIBILITY:
          this.onSetAvailibility(actionEvent.payload);
          break;
      }
    });
  }

  onReceiveEvent($event: ProductActionEvent) {
    switch ($event.type) {
      // From ProductNav
      case ProductEvents.ALL: { }
        this.getAllProducts();
        break;
      case ProductEvents.AVAILABLE:
        this.getAvailableProducts();
        break;
      // From ProductList
      case ProductEvents.SELECT:
        this.onSelect($event.payload);
        break;
      case ProductEvents.DELETE:
        this.onDelete($event.payload);
        break;
    }
  }

  getAllProducts() {
    // this.pService.getAllProducts().subscribe(data => {
    //   this.products = data;
    // }, error => {
    //   console.log(error);
    // });

    this.products$ = this.pService.getAllProducts()
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(error => of({ dataState: DataStateEnum.ERROR, errorMessage: error.message }))
      );
  }

  getSelectedProducts() {
    this.products$ = this.pService.getSelectedProducts()
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(error => of({ dataState: DataStateEnum.ERROR, errorMessage: error.message }))
      );
  }

  getAvailableProducts() {
    this.products$ = this.pService.getAvailableProducts()
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(error => of({ dataState: DataStateEnum.ERROR, errorMessage: error.message }))
      );
  }

  onSearch(dataForm: any) {
    this.products$ = this.pService.searchProducts(dataForm.keyword)
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(error => of({ dataState: DataStateEnum.ERROR, errorMessage: error.message }))
      );
  }

  onSelect(product: Product) {
    this.pService.selectProduct(product).subscribe();
  }

  onSetAvailibility(product: Product) {
    this.pService.setAvailaibility(product).subscribe(() => {
      this.getAllProducts();
    });
  }

  onDelete(product: Product) {
    let deleteConfirm = `Do you really want to delete the ${product.name} product`;
    if (confirm(deleteConfirm)) {
      this.pService.deleteProduct(product).subscribe(() => {
        this.getAllProducts();
      });
    }
  }

  onEditProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
