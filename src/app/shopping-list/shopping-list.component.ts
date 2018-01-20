import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../shared/ingredients.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients = [
    new Ingredient('tomatoo', 7),
    new Ingredient('macaroni', 10),
    new Ingredient('cheeze', 5)
  ];

  constructor() { }

  ngOnInit() {
  }

}
