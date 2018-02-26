import {Component, OnInit} from '@angular/core';

import {Ingredient} from "../shared/ingredients.model";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import * as shoppingListActions from './state/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.shoppingListState = this.store.select('shoppingList');
  }
  onEditIngredient(index: number) {
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }

}
