import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StatsComponent } from '../inflow-outflow/stats/stats.component';
import { InflowOutflowComponent } from '../inflow-outflow/inflow-outflow.component';
import { DetailsComponent } from '../inflow-outflow/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: StatsComponent,
      },
      {
        path: 'inflow-outflow',
        component: InflowOutflowComponent,
      },
      {
        path: 'details',
        component: DetailsComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
