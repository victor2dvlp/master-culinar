import {RecipeModel} from "./recipe.model";
import { Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredients.model";
import {ShoppingService} from "../shopping-list/shopping.service";
import {Subject} from "rxjs/Subject";
import {ServerService} from "../server.service";
import {Response} from "@angular/http";

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<RecipeModel[]>();

  private recipes: RecipeModel[] = [
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
  ];

  constructor(private shopService: ShoppingService, private serverService: ServerService) {}

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  toShopingList(ingredients: Ingredient[]) {
    this.shopService.addIngredients(ingredients);
  }
  addRecipe(newRecipe: RecipeModel) {
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: RecipeModel) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
  saveRecipes() {
    this.serverService.saveRecipes(this.recipes).subscribe(
      (response: Response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  fetchRecipes() {
    this.serverService.getRecipes().subscribe(
      (recipes: RecipeModel[]) => {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
