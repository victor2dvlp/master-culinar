import {Ingredient} from "../shared/ingredients.model";

export class RecipeModel {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor (name: string, desc: string, imgPath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imgPath;
    this.ingredients = ingredients;
  }


}
