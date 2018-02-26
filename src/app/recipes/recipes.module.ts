import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipesRoutesModule} from "./recipes-routes.module";
import {SharedModule} from "../shared/shared.module";
import {AuthGuardService} from "../auth/auth-guard.service";
import {StoreModule} from "@ngrx/store";
import {recipesReducer} from "./store/recipes.reducers";
import {EffectsModule} from "@ngrx/effects";
import {RecipesEffects} from "./store/recipes.effects";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent
  ],
  imports: [
    ReactiveFormsModule,
    RecipesRoutesModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipesReducer),
    EffectsModule.forFeature([RecipesEffects])
  ],
  providers: [AuthGuardService]
})
export class RecipesModule {}
