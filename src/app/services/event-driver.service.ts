import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductActionEvent } from '../models/product-event';

@Injectable({
  providedIn: 'root'
})
export class EventDriverService {

  sourceEventSubject: Subject<ProductActionEvent> = new Subject<ProductActionEvent>();
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();

  constructor() { }

  publishEvent(event: ProductActionEvent){
    this.sourceEventSubject.next(event);
  }
}
