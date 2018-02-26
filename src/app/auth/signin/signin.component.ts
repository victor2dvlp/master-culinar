import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AppState} from "../../store/app.reducers";
import {Store} from "@ngrx/store";
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
  }
  onSignin(form: NgForm) {
    this.router.navigate(['/']);
    const email = form.value.email;
    const password = form.value.password;
    console.log('onSignIn submit');
    console.log('username: ' + email);
    console.log('password: ' + password);
    this.store.dispatch(new AuthActions.TrySignIn({username: email, password: password}));
  }
}
