import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from "../../recipe.model";
import {RecipeService} from "../../recipe.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeElement') item_recipe: RecipeModel;
  @Input() recipeIndex: number;
  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
  }
}
