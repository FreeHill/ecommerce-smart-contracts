import { combineReducers } from 'redux';
import {ActionTypes as types} from '../actions';
import { IReduxStore } from '../types';

const all = (state: Partial<IReduxStore["order"]>[] = [], action: any) => {
  switch (action.type) {
    case types.FETCH_ORDERS_SUCCESS:
      return [...action.orders];

    case types.FETCH_ORDERS:
    case types.FETCH_ORDERS_FAIL:
      return [];

    case types.PLACE_ORDER_SUCCESS:
      return [...state, action.order];

    case types.ACCEPT_ORDER_SUCCESS:
    case types.REJECT_ORDER_SUCCESS: {
      const newState = [...state];
      const oldOrder = newState.find(order => order.escrow === action.order.escrow);

      if (!oldOrder) {
        return state;
      }

      oldOrder.product = action.order.product;

      return newState;
    }

    default:
      return state;
  }
};

const isFetching = (state = false, action: any) => {
  switch (action.type) {
    case types.FETCH_ORDERS:
      return true;

    case types.FETCH_ORDERS_SUCCESS:
    case types.FETCH_ORDERS_FAIL:
      return false;

    default:
      return state;
  }
};

const errorMessage = (state = null, action: any) => {
  switch (action.type) {
    case types.FETCH_ORDERS_FAIL:
      return action.message;

    case types.FETCH_ORDERS:
    case types.FETCH_ORDERS_SUCCESS:
      return null;

    default:
      return state;
  }
};

const view = (state = 'buyer', action: any) => {
  switch (action.type) {
    case types.CHANGE_VIEW:
      return action.view;

    default:
      return state;
  }
};

const ordersReducer = combineReducers({
  all,
  isFetching,
  errorMessage,
  view,
});

export default ordersReducer;
