import { Component, OnInit } from '@angular/core';
import {fadeAnimation} from "../shared/fade.animation";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  animations: [fadeAnimation]
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }


}
