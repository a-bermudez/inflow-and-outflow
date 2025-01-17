import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './interfaces/state.interface';
import { uiReducer } from './shared/ui.reducer';
import { authReducer } from './auth/auth.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  user: authReducer,
};
