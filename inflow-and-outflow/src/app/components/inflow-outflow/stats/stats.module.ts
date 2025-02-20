import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { AgCharts } from 'ag-charts-angular';

@NgModule({
  declarations: [StatsComponent],
  imports: [CommonModule, AgCharts],
  exports: [StatsComponent],
})
export class StatsModule {}
