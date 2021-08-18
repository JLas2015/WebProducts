import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductEvents } from 'src/app/models/data-state-enum';
import { ProductActionEvent } from 'src/app/models/product-event';
import { EventDriverService } from 'src/app/services/event-driver.service';

@Component({
  selector: 'app-products-nav',
  templateUrl: './products-nav.component.html',
  styleUrls: ['./products-nav.component.css']
})
export class ProductsNavComponent implements OnInit {

  @Output()
  pEventEmitter: EventEmitter<ProductActionEvent> = new EventEmitter();

  constructor(private router: Router, private edService: EventDriverService) { }

  ngOnInit(): void {
  }

  // Using communication via EventEmitter (Child to parent)
  getAllProducts(){
    this.pEventEmitter.emit({
      type : ProductEvents.ALL
    });
  }

  // Using communication via service
  getSelectedProducts(){
    this.edService.publishEvent({
      type : ProductEvents.SELECTED
    });
  }

  // Using communication via EventEmitter (Child to parent)
  getAvailableProducts(){
    this.pEventEmitter.emit({
      type : ProductEvents.AVAILABLE
    });
  }

  // Using communication via service
  onSearch(dataForm: string){
    this.edService.publishEvent({
      type : ProductEvents.SEARCH,
      payload : dataForm
    })
  }

  // Using communication via EventEmitter (Child to parent)
  addProduct(){
    this.router.navigateByUrl("/addProduct");
  }
}
