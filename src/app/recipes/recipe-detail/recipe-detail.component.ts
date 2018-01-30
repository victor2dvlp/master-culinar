import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {Ingredient} from "../../shared/ingredients.model";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 @Input('recipeData') RecipeData: RecipeModel;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }
  toShopingList() {
    this.recipeService.toShopingList(this.RecipeData.ingredients);
  }

}
