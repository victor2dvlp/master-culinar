import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../recipes/recipe.service";
import {ShoppingService} from "../shopping-list/shopping.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit  {
  constructor(
    private recipeService:RecipeService,
    private ingredService: ShoppingService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    console.log('token: ' + this.authService.isAuthenticated());
  }

  onSave() {
    this.recipeService.saveRecipes();
    this.ingredService.saveIngredients();
  }
  onFetch() {
    this.recipeService.fetchRecipes();
    this.ingredService.fetchIngredients();
  }
  onLogout() {
    this.authService.Logout();
  }
}
