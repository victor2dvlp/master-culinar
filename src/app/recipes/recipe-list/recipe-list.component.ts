import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromRecipeReducers from '../store/recipes.reducers';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipesState: Observable<fromRecipeReducers.State>;
  constructor(
    private store: Store<fromRecipeReducers.FeatureStore>,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
