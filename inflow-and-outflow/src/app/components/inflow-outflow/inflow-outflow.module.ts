import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InflowOutflowComponent } from './inflow-outflow.component';
import { DetailsModule } from './details/details.module';
import { StatsModule } from './stats/stats.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InflowOutflowComponent],
  imports: [CommonModule, StatsModule, DetailsModule, ReactiveFormsModule],
  exports: [InflowOutflowComponent, StatsModule, DetailsModule],
})
export class InflowOutflowModule {}
