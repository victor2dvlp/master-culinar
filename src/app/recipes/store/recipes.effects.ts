import {Injectable} from "@angular/core";
import * as RecipesActions from './recipes.actions';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {Actions, Effect} from "@ngrx/effects";
import {RecipeModel} from "../recipe.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import {Store} from "@ngrx/store";
import * as RecipeReducers from './recipes.reducers';


@Injectable()
export class RecipesEffects {
  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<RecipeReducers.FeatureStore>
  ) {}

  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipesActions.FETCH_RECIPES)
    .switchMap((action: RecipesActions.FetchRecipes) => {
      return this.httpClient.get<RecipeModel[]>(
        'https://ng-master-culinar.firebaseio.com/recipes.json', {
          observe: 'body',
          responseType: 'json',
        })
    })
    .map((recipes) => {
      for(let recipe of recipes) {
        if(!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      };
      return {
        type: RecipesActions.SET_RECIPES,
        payload: recipes
      };
    });
  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipesActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      console.log('effect: recipes: ', state.recipes);
      const req = new HttpRequest(
        'PUT',
        'https://ng-master-culinar.firebaseio.com/recipes.json',
        state.recipes,
        {reportProgress: true});
      return this.httpClient.request(req);
    });
}
