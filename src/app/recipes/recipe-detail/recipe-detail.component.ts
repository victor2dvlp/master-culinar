import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../../shopping-list/state/shopping-list.actions';
import {Observable} from "rxjs/Observable";
import * as fromRecipeReducers from '../store/recipes.reducers';
import * as RecipesActions from '../store/recipes.actions';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
 recipesState: Observable<fromRecipeReducers.State>;
 subscription: Subscription;
 id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipeReducers.FeatureStore>
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if (
          // this may be cheching out if valid id recived
          this.id >= 0
        ) {
          this.recipesState = this.store.select('recipes');
          console.log('+ On init: id = ' + this.id);
        } else {
          console.log('On init: id = ' + this.id);
          this.router.navigate(['/not-found']);
        }
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  toShopingList() {
    this.store.select('recipes')
      .take(1)
      .subscribe(
        (recipeState: fromRecipeReducers.State) => {
          console.log('ingredients: ', recipeState.recipes[this.id].ingredients);
          if(recipeState.recipes[this.id].ingredients.length) {
            this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
          } else {
            alert('There are no any ingredient in current recipe!');
            console.log('empty');
          }
        }
      );
  }

  deleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
