import { User } from "../models/user.model";

export interface State {
  isLoading: boolean;
}

export interface AppState {
  ui: State;
  user: AuthState
}

export interface AuthState {
  user?: User | null;
}