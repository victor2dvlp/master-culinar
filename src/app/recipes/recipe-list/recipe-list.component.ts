import { Component, OnInit } from '@angular/core';

import { RecipeModel} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recepies: RecipeModel[] = [
    new RecipeModel('Salate', 'test salate description', 'http://www.sushiojirestaurant.de/WebRoot/Store4/Shops/78239554/MediaGallery/Bingoel-Kebap-salat1.jpg'),
    new RecipeModel('Pizza', 'test pizza description', 'http://pizza-piemonte.com.ua/images/pizza.jpg'),
    new RecipeModel('Pasta carbonara', 'test pastacarbonara  description', 'http://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18173700/051092056-01-spaghetti-carbonara-recipe-main.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

}
