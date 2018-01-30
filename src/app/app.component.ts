import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showComponent = 'recipe';

  onNavSelect( itemName: string ) {
    this.showComponent = itemName;
  }
}
