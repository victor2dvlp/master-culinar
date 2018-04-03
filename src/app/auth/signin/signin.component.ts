import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AppState} from "../../store/app.reducers";
import {Store} from "@ngrx/store";
import * as AuthActions from '../store/auth.actions';
import * as fromAuth from "../store/auth.reducers";
import {Observable} from "rxjs/Observable";
import {fadeAnimation} from "../../shared/fade.animation";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [fadeAnimation]
})
export class SigninComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
    this.store.dispatch(new AuthActions.ErrorAuth(''));
  }
  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    console.log('onSignIn submit');
    console.log('username: ' + email);
    console.log('password: ' + password);
    this.store.dispatch(new AuthActions.TrySignIn({username: email, password: password}));
  }
}
