import { createReducer, on } from '@ngrx/store';
import * as ProductsAction from './actions';

export const initialState = {
  loading: false,
  products: [],
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(ProductsAction.getProducts, (state) => ({ ...state, loading: true }))
);
