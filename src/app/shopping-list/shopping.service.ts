import {Ingredient} from "../shared/ingredients.model";
import {EventEmitter} from "@angular/core";
import {Subject} from "rxjs/Subject";

export class ShoppingService {
  ingredientsChange = new Subject<Ingredient[]>();
  ingredientsEdit = new Subject<number>();
  private ingredients = [
    new Ingredient('tomatoo', 7),
    new Ingredient('macaroni', 10),
    new Ingredient('cheeze', 5)
  ];
  getShopingList() {
    return this.ingredients.slice();
  }
  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChange.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChange.next(this.ingredients.slice());
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.next(this.ingredients.slice() );
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChange.next( this.ingredients.slice() );
  }
}
