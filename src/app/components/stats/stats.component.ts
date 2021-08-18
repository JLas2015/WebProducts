import { Component, OnInit } from '@angular/core';
import { ProductActionEvent } from 'src/app/models/product-event';
import { EventDriverService } from 'src/app/services/event-driver.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  counter = 0;

  constructor(private sdService: EventDriverService) { }

  ngOnInit(): void {
    this.sdService.sourceEventSubjectObservable.subscribe((productAE: ProductActionEvent) => {
      ++this.counter;
    });
  }

}
