import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../shared/ingredients.model";
import {ShoppingService} from "../shopping.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shopingService: ShoppingService) { }

  ngOnInit() {
  }

  onAddIngred(amount: HTMLInputElement, name: HTMLInputElement) {
      this.shopingService.addIngredient(
        new Ingredient(name.value, Number.parseInt(amount.value))
      );
  }

}
