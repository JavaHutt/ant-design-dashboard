import { Dispatch } from 'redux';
import { CognitoUser, AuthenticationDetails, CookieStorage, CognitoUserSession } from 'amazon-cognito-identity-js';
import userPool from '../../userPool';
import { UserAction, UserActionTypes } from '../types/user';
import LoginValues from '../../models/user';

const successLogin = (user: CognitoUser, dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionTypes.USER_LOGIN_SUCCESS, payload: user });
};

export const userLogout = (user: CognitoUser | null, dispatch: Dispatch<UserAction>) => {
    console.log('logout');
    user?.signOut(() => {
        dispatch({ type: UserActionTypes.USER_LOGOUT });
    });
    dispatch({ type: UserActionTypes.USER_LOGOUT });
};

export const userLogin = ({ username, password }: LoginValues) => {
    const user = new CognitoUser({
        Username: username,
        Pool: userPool,
        Storage: new CookieStorage({ domain: 'localhost', secure: false }),
    });
    const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
    });

    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.USER_LOGIN, payload: user });
            user.authenticateUser(authDetails, {
                onSuccess: () => successLogin(user, dispatch),
                onFailure: (err: any) => dispatch({ type: UserActionTypes.USER_LOGIN_ERROR, payload: err }),
                newPasswordRequired: () => dispatch({ type: UserActionTypes.USER_LOGIN_FORCE_CHANGE_PASSWORD }),
            });
        } catch (e) {
            console.log('error', e);
            dispatch({ type: UserActionTypes.USER_LOGIN_ERROR, payload: e });
        }
    };
};

export const userError = (errorInfo: any) => ({ type: UserActionTypes.USER_LOGIN_ERROR, payload: errorInfo });

export const userChangePassword = (user: CognitoUser, newPassword: string) => async (dispatch: Dispatch<UserAction>) => {
    try {
        user.completeNewPasswordChallenge(newPassword, null, {
            onSuccess: () => successLogin(user, dispatch),
            onFailure: (err: any) => dispatch({ type: UserActionTypes.USER_LOGIN_ERROR, payload: err }),
        });
    } catch (e) {
        dispatch({ type: UserActionTypes.USER_LOGIN_ERROR, payload: e });
    }
};

export const firstLogin = (currentUser: CognitoUser | null) => async (dispatch: Dispatch<UserAction>) => {
    console.log('current user from first login: ', currentUser);
    if (!currentUser) return userLogout(null, dispatch);

    try {
        currentUser.getSession((error: any, session: CognitoUserSession) => {
            console.log('get session err: ', error);
            if (error) return userLogout(currentUser, dispatch);
            
            const tokenExpire = session.getIdToken().getExpiration();
            console.log('expire number: ', tokenExpire);
            if (Date.now() > tokenExpire * 1000) {
                console.log('token expire');
                return userLogout(currentUser, dispatch);
            }
            console.log('success dispatch 1');
            return successLogin(currentUser, dispatch);
        });
    } catch (e) {
        userError(e);
    }
};
