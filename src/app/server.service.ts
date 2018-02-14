import { Injectable } from '@angular/core';
import {RecipeModel} from "./recipes/recipe.model";
import {Http, Response} from "@angular/http";
import {Ingredient} from "./shared/ingredients.model";
import 'rxjs/Rx';

@Injectable()
export class ServerService {

  constructor(private http: Http) { }
  saveRecipes(recipes: RecipeModel[]) {
    return this.http.put('https://ng-master-culinar.firebaseio.com/recipes.json', recipes);
  }
  saveIngredients(ingredients: Ingredient[]) {
    return this.http.put('https://ng-master-culinar.firebaseio.com/ingredients.json', ingredients);
  }
  getRecipes() {
    return this.http.get('https://ng-master-culinar.firebaseio.com/recipes.json').map(
      (response: Response) => {
        const recipes = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    );
  }
  getIngredients() {
    return this.http.get('https://ng-master-culinar.firebaseio.com/ingredients.json').map(
      (response: Response) => {
        return response.json();
      }
    );
  }

}
