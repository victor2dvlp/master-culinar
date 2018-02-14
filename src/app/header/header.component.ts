import {Component} from '@angular/core';
import {RecipeService} from "../recipes/recipe.service";
import {ShoppingService} from "../shopping-list/shopping.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  constructor(private recipeService:RecipeService, private ingredService: ShoppingService) {}

  onSave() {
    this.recipeService.saveRecipes();
    this.ingredService.saveIngredients();
  }
  onFetch() {
    this.recipeService.fetchRecipes();
    this.ingredService.fetchIngredients();
  }
}
