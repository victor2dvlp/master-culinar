import {Component, OnDestroy, OnInit} from '@angular/core';

import {ShoppingService} from "./shopping.service";
import {Ingredient} from "../shared/ingredients.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: {name: string, amount: number}[] = [];
  subscription: Subscription;

  constructor(private shopingService: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.shopingService.getShopingList();
    this.subscription = this.shopingService.ingredientsChange
      .subscribe(
        (ingredients: Ingredient[]) => this.ingredients = ingredients
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onEditIngredient(index: number) {
    this.shopingService.ingredientsEdit.next(index);
  }

}
