import {Actions, Effect} from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/of';
import {fromPromise} from "rxjs/observable/fromPromise";
import * as firebase from 'firebase';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map( (action: AuthActions.TrySignUp) => {
      return action.payload;
    })
    .switchMap( (authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth()
        .createUserWithEmailAndPassword(authData.username, authData.password))
        .switchMap( () => {
          return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap( (token: string) => {
          this.router.navigate(['/']);
          return [
            {
              type: AuthActions.SIGNUP
            },
            {
              type: AuthActions.SET_TOKEN,
              payload: token
            }
          ];
        }).catch(error => Observable.of({type: AuthActions.ERROR, payload: error}));
    });

  @Effect()
  signIn = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map( (action: AuthActions.TrySignIn) => {
      return action.payload;
    })
    .switchMap( (authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth()
        .signInWithEmailAndPassword(authData.username, authData.password))
        .switchMap( () => {
          return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap( (token: string) => {
          this.router.navigate(['/']);
          return [
            {
              type: AuthActions.SIGNIN
            },
            {
              type: AuthActions.SET_TOKEN,
              payload: token
            }
          ];
        }).catch(error => Observable.of({type: AuthActions.ERROR, payload: error}));
    } );

  @Effect({dispatch: false})
  signOut = this.actions$
    .ofType(AuthActions.SIGNOUT)
    .do(
      () => {
        this.router.navigate(['/']);
        console.log('logout');
      }
    );
  constructor(private actions$: Actions, private router: Router) {}
}
