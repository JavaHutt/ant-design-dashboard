import { Dispatch } from 'redux';
import { CognitoUser, AuthenticationDetails, CookieStorage, CognitoUserSession } from 'amazon-cognito-identity-js';
import userPool from '../../userPool';
import { UserAction, UserActionTypes } from '../types/user';
import LoginValues from '../../models/user';

const successLogin = (data: CognitoUserSession, dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionTypes.USER_LOGIN_SUCCESS });
};

export const userLogout = (user: CognitoUser) => {
    user.signOut();
    return ({ type: UserActionTypes.USER_LOGOUT });
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
                onSuccess: data => successLogin(data, dispatch),
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
            onSuccess: data => successLogin(data, dispatch),
            onFailure: (err: any) => dispatch({ type: UserActionTypes.USER_LOGIN_ERROR, payload: err }),
        });
    } catch (e) {
        dispatch({ type: UserActionTypes.USER_LOGIN_ERROR, payload: e });
    }
};

export const firstLogin = () => {
    const currentUser = userPool.getCurrentUser();

    if (!currentUser) {
        return ({ type: UserActionTypes.USER_LOGOUT });
    }
    currentUser.getSession((error: any, session: CognitoUserSession) => {
        if (error) return ({ type: UserActionTypes.USER_LOGIN_ERROR, payload: error });
        const tokenExpire = session.getAccessToken().getExpiration();
        if (Date.now() > tokenExpire * 1000) return userLogout(currentUser);
        return ({ type: UserActionTypes.USER_LOGIN_SUCCESS });
    });
    return ({ type: UserActionTypes.USER_LOGIN_SUCCESS });
};
