import {Ingredient} from "../shared/ingredients.model";
import {EventEmitter} from "@angular/core";

export class ShoppingService {
  ingredientsChange = new EventEmitter<Ingredient[]>();
  private ingredients = [
    new Ingredient('tomatoo', 7),
    new Ingredient('macaroni', 10),
    new Ingredient('cheeze', 5)
  ];
  getShopingList() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.emit(this.ingredients.slice() );
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChange.emit( this.ingredients.slice() );
  }
}
