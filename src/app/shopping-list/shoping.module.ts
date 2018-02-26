import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

// const shopingRoutes: Routes = [
//   {path: 'shoping-list', component: ShoppingListComponent }
// ]

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
 //   RouterModule.forChild(shopingRoutes)
  ],
 // exports: [RouterModule]
})
export class ShopingModule {}
