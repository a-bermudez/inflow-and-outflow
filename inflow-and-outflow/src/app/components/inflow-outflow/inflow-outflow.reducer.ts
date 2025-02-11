import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './inflow-outflow.actions';
import { ItemsState } from 'src/app/interfaces/state.interface';

export const initialState: ItemsState = {
  items: [],
};

export const inflowOutflowReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items: [...items] })), // Correcto, actualiza los items
  on(unSetItems, () => ({ ...initialState })) // Garantiza que el estado sea un nuevo objeto
);
