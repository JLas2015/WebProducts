import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductEvents } from 'src/app/models/data-state-enum';
import { ProductActionEvent } from 'src/app/models/product-event';
import { Product } from 'src/app/models/product.model';
import { EventDriverService } from 'src/app/services/event-driver.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input()
  product!: Product;
  
  @Output()
  pEventEmitter: EventEmitter<ProductActionEvent> = new EventEmitter();

  constructor(private edService: EventDriverService) { }

  ngOnInit(): void {
  }

  // Using communication via EventEmitter (Child to parent)
  onSelect(product: Product){
    this.pEventEmitter.emit({
      type: ProductEvents.SELECT,
      payload: product
    });
  }

  // Using communication via EventEmitter (Child to parent)
  onDelete(product: Product){
    this.pEventEmitter.emit({
      type: ProductEvents.DELETE,
      payload: product
    });
  }

  // Using communication via service
  onEditProduct(product: Product){
    this.edService.publishEvent({
      type: ProductEvents.EDIT,
      payload: product
    });
  }

  // Using communication via service
  onSetAvailable(product: Product){
    this.edService.publishEvent({
      type: ProductEvents.SET_AVAILAIBILITY,
      payload: product
    });
  }

}
