import { Pipe, PipeTransform } from '@angular/core';
import { InflowOutflow } from '../models/inflowOutflow.model';

@Pipe({
  name: 'inflowOutflow',
})
export class InflowOutflowPipe implements PipeTransform {
  transform(value: InflowOutflow[] | null | undefined): InflowOutflow[] {
    if (!value) {
      return [];
    }
    return [...value].sort((a, b) => (a.type === 'inflow' ? -1 : 1));
  }
}
