import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';
import { State } from '../interfaces/state.interface';

export const initialState: State = {
  isLoading: false,
};

export const uiReducer = createReducer(
  initialState,
  on(isLoading, (state) => ({ ...state, isLoading: true })),
  on(stopLoading, (state) => ({ ...state, isLoading: false }))
);
