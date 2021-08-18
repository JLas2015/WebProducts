import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AppDataState } from 'src/app/models/app-data-state';
import { DataStateEnum, ProductEvents } from 'src/app/models/data-state-enum';
import { ProductActionEvent } from 'src/app/models/product-event';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input()
  products$?: Observable<AppDataState<Product[]>>;
  
  @Output()
  pEventEmitter: EventEmitter<ProductActionEvent> = new EventEmitter();

  readonly dataStateEnum = DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onReceiveItemEvent($event: ProductActionEvent){
    this.pEventEmitter.emit($event);
  }
}
