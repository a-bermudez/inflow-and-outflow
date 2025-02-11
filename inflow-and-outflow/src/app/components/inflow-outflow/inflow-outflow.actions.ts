import { createAction, props } from '@ngrx/store';
import { InflowOutflow } from 'src/app/models/inflowOutflow.model';

export const setItems = createAction(
  '[InflowOutflow] Set Items',
  props<{ items: InflowOutflow[] }>()
);
export const unSetItems = createAction('[unSetItems] Unset Items');
