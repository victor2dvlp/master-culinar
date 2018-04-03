import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AppState} from "../../store/app.reducers";
import {Store} from "@ngrx/store";
import * as AuthActions from '../store/auth.actions';
import * as fromAuth from "../store/auth.reducers";
import {Observable} from "rxjs/Observable";
import {fadeAnimation} from "../../shared/fade.animation";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [fadeAnimation]
})
export class SignupComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
    this.store.dispatch(new AuthActions.ErrorAuth(''));
  }
  onSignup(signupForm: NgForm) {
    const mail = signupForm.value.email;
    const password = signupForm.value.password;
    this.store.dispatch(new AuthActions.TrySignUp({username: mail, password: password}));
  }
}
