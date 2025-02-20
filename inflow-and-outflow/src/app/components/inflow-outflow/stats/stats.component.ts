import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, distinctUntilChanged, filter } from 'rxjs';
import { AppState } from 'src/app/interfaces/state.interface';
import { InflowOutflow } from 'src/app/models/inflowOutflow.model';
import { AgChartOptions } from 'ag-charts-community';

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
  outflows: number = 0;
  public chartOptions!: AgChartOptions;
  dataLoaded: boolean = false;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store
        .select('inflowOutflow')
        .pipe(
          distinctUntilChanged(),
          filter(({ items }) => items.length > 0)
        )
        .subscribe(({ items }) => {
          this.generateStats(items);
          this.updateChart();
          this.dataLoaded = true;
        })
    );
  }

  generateStats(items: InflowOutflow[]): void {
    this.totalInflow = 0;
    this.inflows = 0;
    this.totalOutflow = 0;
    this.outflows = 0;
    for (const item of items) {
      if (item.type === 'inflow') {
        this.totalInflow += item.amount;
        this.inflows++;
      } else {
        this.totalOutflow += item.amount;
        this.outflows++;
      }
    }
  }
  updateChart(): void {
    this.chartOptions = {
      data: [
        { Type: 'Ingresos', totalAmount: this.totalInflow },
        { Type: 'Gastos', totalAmount: this.totalOutflow },
      ],
      series: [
        {
          type: 'donut',
          legendItemKey: 'Type',
          angleKey: 'totalAmount',
          innerRadiusRatio: 0.6,
        },
      ],
    };
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
