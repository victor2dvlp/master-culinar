import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredients.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../state/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
@ViewChild('editForm') editForm: NgForm;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientIndex > -1) {
            this.editMode = true;

            this.editForm.setValue({
              name: data.editedIngredient.name,
              amount: data.editedIngredient.amount
            });
          } else {
            this.editMode = false;
          }
        }
      );
  }

  onSubmit(editForm: NgForm ) {
    const value = editForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredients({ingredient: newIngredient}));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    editForm.reset();
  }
  onClear() {
    this.editForm.reset();
    this.editMode = false;
  }
  onDelete() {
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.DeleteIngredients());
      this.onClear();
    }
  }
  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
