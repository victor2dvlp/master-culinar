import {RecipeModel} from "../recipe.model";
import {Ingredient} from "../../shared/ingredients.model";
import * as fromRecipeActions from './recipes.actions';
import {AppState} from "../../store/app.reducers";

export interface FeatureStore extends AppState {
  recipes: State
}

export interface State {
  recipes: RecipeModel[]
}

const initialState: State = {
  recipes: [
    new RecipeModel(
      'Salate',
      'test salate description',
      'http://www.sushiojirestaurant.de/WebRoot/Store4/Shops/78239554/MediaGallery/Bingoel-Kebap-salat1.jpg',
      [
        new Ingredient('tomato', 3),
        new Ingredient('cucumber', 2),
        new Ingredient('majoneze', 1)
      ],
    ),
    new RecipeModel(
      'Pizza',
      'test pizza description',
      'http://pizza-piemonte.com.ua/images/pizza.jpg',
      [
        new Ingredient('bread', 3),
        new Ingredient('mozzarella', 1),
        new Ingredient('parmezan', 1),
        new Ingredient('mushrooms', 2)
      ]
    ),
    new RecipeModel('Pasta carbonara',
      'test pastacarbonara  description',
      'http://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18173700/051092056-01-spaghetti-carbonara-recipe-main.jpg',
      [
        new Ingredient('spagetti', 4),
        new Ingredient('parmezan', 2),
        new Ingredient('egg', 1),
        new Ingredient('butter', 1),
        new Ingredient('pancetta', 3)

      ]
    )
  ]
};

export function recipesReducer(state = initialState, action: fromRecipeActions.RecipesActions) {
  switch (action.type) {

    case fromRecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    case fromRecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case fromRecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const newRecipe = {
        ...recipe,
        ...action.payload.element
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = newRecipe;
      return {
        ...state,
        recipes: [...recipes]
      };

    case fromRecipeActions.DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: [...oldRecipes]
      };

    default:
      return state;
  }
}
