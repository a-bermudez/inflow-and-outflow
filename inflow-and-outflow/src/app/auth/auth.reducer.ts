import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { AuthState } from '../interfaces/state.interface';

export const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.setUser, (state, { user }) => ({
    ...state,
    user,
  })),
  on(authActions.unSetUser, (state) => ({
    ...initialState,
  }))
);
