import * as fromShoppingList from '../shopping-list/state/shoping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shopingListReducer,
  auth: fromAuth.AuthReducer
}
