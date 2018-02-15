import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showComponent = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyA22ah_0xYoImbr2DGnw-ilUzkqAsJrNXk",
      authDomain: "ng-master-culinar.firebaseapp.com"
    });
  }

  onNavSelect( itemName: string ) {
    this.showComponent = itemName;
  }
}
