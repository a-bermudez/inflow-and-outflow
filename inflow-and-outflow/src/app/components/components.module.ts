import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { DetailsModule } from './inflow-outflow/details/details.module';
import { InflowOutflowModule } from './inflow-outflow/inflow-outflow.module';
import { StatsModule } from './inflow-outflow/stats/stats.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InflowOutflowModule,
    DetailsModule,
    StatsModule,
    DashboardModule,
  ],
  exports: [DashboardModule, InflowOutflowModule, DetailsModule, StatsModule],
})
export class ComponentsModule {}
