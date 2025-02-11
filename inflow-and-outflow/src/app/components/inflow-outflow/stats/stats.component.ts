import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, skip, Subscription, take } from 'rxjs';
import { AppState } from 'src/app/interfaces/state.interface';
import { InflowOutflow } from 'src/app/models/inflowOutflow.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  totalInflow?: number = 0;
  inflows: number = 0;
  totalOutflow?: number = 0;
  outflow: number = 0;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store
        .select('inflowOutflow')
        .pipe(distinctUntilChanged(), take(2), skip(1))
        .subscribe(({ items }) => {
          if (items.length > 0) {
            console.log(items);
          }
        })
    );
  }

  generateStats(items: InflowOutflow[]): void {
    for (const item of items) {
      if (item.type === 'inflow') {
        this.totalInflow += item.amount;
        this.inflows++;
      } else {
        this.totalOutflow += item.amount;
        this.outflow++;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
