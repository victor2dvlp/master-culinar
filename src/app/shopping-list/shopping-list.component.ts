import { Component, OnInit } from '@angular/core';

import {ShoppingService} from "./shopping.service";
import {Ingredient} from "../shared/ingredients.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: {name: string, amount: number}[] = [];

  constructor(private shopingService: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.shopingService.getShopingList();
    this.shopingService.ingredientsChange
      .subscribe(
        (ingredients: Ingredient[]) => this.ingredients = ingredients
      );
  }
}
