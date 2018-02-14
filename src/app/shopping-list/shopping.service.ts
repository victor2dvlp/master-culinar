import {Ingredient} from "../shared/ingredients.model";
import {Subject} from "rxjs/Subject";
import {ServerService} from "../server.service";
import {Response} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ShoppingService {
  ingredientsChange = new Subject<Ingredient[]>();
  ingredientsEdit = new Subject<number>();
  private ingredients = [
    new Ingredient('tomatoo', 7),
    new Ingredient('macaroni', 10),
    new Ingredient('cheeze', 5)
  ];
  constructor(private serverService: ServerService) {}
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
  saveIngredients() {
    this.serverService.saveIngredients(this.ingredients).subscribe(
      (response: Response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  fetchIngredients() {
    this.serverService.getIngredients().subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        this.ingredientsChange.next( this.ingredients.slice() );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
