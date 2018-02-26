import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AppState} from "../../store/app.reducers";
import {Store} from "@ngrx/store";
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
  }
  onSignup(signupForm: NgForm) {
    this.router.navigate(['/signin']);
    const mail = signupForm.value.email;
    const password = signupForm.value.password;
    this.store.dispatch(new AuthActions.TrySignUp({username: mail, password: password}));
  }

}
