import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredients.model";
import {ShoppingService} from "../shopping.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  selectedIngredient: Ingredient;
@ViewChild('editForm') editForm: NgForm;

  constructor(private shopingService: ShoppingService) { }

  ngOnInit() {
    this.subscription = this.shopingService.ingredientsEdit.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.selectedIngredient = this.shopingService.getIngredient(index);
        this.editForm.setValue({
          name: this.selectedIngredient.name,
          amount: this.selectedIngredient.amount
        });

      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(editForm: NgForm ) {
    const value = editForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shopingService.updateIngredient(this.editItemIndex, newIngredient);
    } else {
      this.shopingService.addIngredient(
        new Ingredient(value.name, value.amount)
      );
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
      this.shopingService.deleteIngredient(this.editItemIndex);
      this.onClear();
    }
  }
}
