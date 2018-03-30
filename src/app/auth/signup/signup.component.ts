import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AppState} from "../../store/app.reducers";
import {Store} from "@ngrx/store";
import * as AuthActions from '../store/auth.actions';
import * as fromAuth from "../store/auth.reducers";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
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
