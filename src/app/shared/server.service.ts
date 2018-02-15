import { Injectable } from '@angular/core';
import {RecipeModel} from "../recipes/recipe.model";
import {Http, Response} from "@angular/http";
import {Ingredient} from "./ingredients.model";
import 'rxjs/Rx';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class ServerService {

  constructor(private http: Http, private authService: AuthService) { }
  saveRecipes(recipes: RecipeModel[]) {
    const token = this.authService.getToken();
    return this.http.put('https://ng-master-culinar.firebaseio.com/recipes.json?auth=' + token, recipes);
  }
  saveIngredients(ingredients: Ingredient[]) {
    const token = this.authService.getToken();
    return this.http.put('https://ng-master-culinar.firebaseio.com/ingredients.json?auth=' + token, ingredients);
  }
  getRecipes() {
    const token = this.authService.getToken();
    return this.http.get('https://ng-master-culinar.firebaseio.com/recipes.json?auth=' + token).map(
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
    const token = this.authService.getToken();
    return this.http.get('https://ng-master-culinar.firebaseio.com/ingredients.json?auth=' + token).map(
      (response: Response) => {
        return response.json();
      }
    );
  }

}
