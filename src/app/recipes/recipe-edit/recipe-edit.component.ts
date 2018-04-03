import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeModel} from "../recipe.model";
import * as fromRecipesReducers from '../store/recipes.reducers';
import * as fromRecipesActions from '../store/recipes.actions';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipesReducers.FeatureStore>
    ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log('editMode = ' + this.editMode);
      }
    );
    this.initForm();
  }
  onSubmit() {
    console.log(this.recipeForm);
    const newRecipe = new RecipeModel(
      this.recipeForm.get('name').value,
      this.recipeForm.get('description').value,
      this.recipeForm.get('imgPath').value,
      this.recipeForm.get('ingredients').value
    );
    if (this.editMode) {
      this.store.dispatch(
        new fromRecipesActions.UpdateRecipe(
          {index: this.id, element: newRecipe})
      );
    } else {
      this.store.dispatch(new fromRecipesActions.AddRecipe(newRecipe));
    }
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes')
        .take(1)
        .subscribe(
          (recipesState: fromRecipesReducers.State) => {
            const recipe = recipesState.recipes[this.id];
            recipeName = recipe.name;
            recipeImgPath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe['ingredients']) {
              for(let ingredient of recipe.ingredients) {
                recipeIngredients.push(new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount,
                    [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                }));
              }
            }
          }
        );
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imgPath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null,
        [Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)]
        )
    }));
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }
  trackByFn(index: any, item: any) {
    return index;
  }

}
