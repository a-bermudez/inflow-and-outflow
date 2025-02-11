import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InflowOutflowPipe } from './inflow-outflow.pipe';

@NgModule({
  declarations: [InflowOutflowPipe],
  imports: [CommonModule],
  exports: [InflowOutflowPipe],
})
export class PipesModule {}
