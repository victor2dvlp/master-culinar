import * as AuthActions from './auth.actions';

export interface State {
  token: string,
  authenticated: boolean,
  errorText: string
}

const initialState: State = {
  token: null,
  authenticated: false,
  errorText: ''
};

export function AuthReducer (state = initialState, action: AuthActions.AuthActions) {
  switch(action.type) {
    case AuthActions.SIGNIN:
    case AuthActions.SIGNUP:
      return {
        ...state,
        authenticated: true,
        errorText: ''
      };
    case AuthActions.SIGNOUT:
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case AuthActions.SET_TOKEN:
      console.log('SET_TOKEN');
      return {
        ...state,
        token: action.payload
      };
    case AuthActions.ERROR:
      console.log('reducer::' + action.payload);
      return {
        ...state,
        token: null,
        authenticated: false,
        errorText: action.payload
      };
    default:
      return state;
  }
}
