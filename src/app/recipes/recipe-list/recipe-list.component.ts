import {Component, OnDestroy, OnInit} from '@angular/core';

import { RecipeModel} from '../recipe.model';
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recepies: RecipeModel[];
  subscription: Subscription;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged
      .subscribe(
        (recipes: RecipeModel[]) => this.recepies = recipes
      );
    this.recepies = this.recipeService.getRecipes();
  }
  ngOnDestroy() {
   // this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
