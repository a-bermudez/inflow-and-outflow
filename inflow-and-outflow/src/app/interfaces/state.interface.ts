import { InflowOutflow } from '../models/inflowOutflow.model';
import { User } from '../models/user.model';

export interface State {
  isLoading: boolean;
}

export interface AppState {
  ui: State;
  user: AuthState;
  inflowOutflow: ItemsState;
}

export interface AuthState {
  user?: User | null;
}

export interface ItemsState {
  items: InflowOutflow[];
}
