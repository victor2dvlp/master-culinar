import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {Ingredient} from "../../shared/ingredients.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
 @Input('recipeData') RecipeData: RecipeModel;
 subscription: Subscription;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.RecipeData = this.recipeService.getRecipe(params['id']);
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  toShopingList() {
    this.recipeService.toShopingList(this.RecipeData.ingredients);
  }

}
