import { Dispatch } from 'redux';
import { CognitoUser, AuthenticationDetails, CookieStorage, CognitoUserSession } from 'amazon-cognito-identity-js';
import userPool from '../../userPool';
import { UserAction, UserActionTypes } from '../types/user';
import { LoginValues } from '../../models/user';

const successLogin = (userData : { user: CognitoUser, session: CognitoUserSession, }): UserAction => (
    { type: UserActionTypes.USER_LOGIN_SUCCESS, payload: userData }
);

export const userError = (errorInfo: any) => ({ type: UserActionTypes.USER_LOGIN_ERROR, payload: errorInfo });

export const userLogout = (user: CognitoUser | null): UserAction => {
    // TODO async or not?
    user?.signOut(() => { console.log('sign out callback') });
    console.log('user logout after callback');
    return { type: UserActionTypes.USER_LOGOUT };
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
                onSuccess: session => dispatch(successLogin({ user, session })),
                onFailure: (err: any) => dispatch({ type: UserActionTypes.USER_LOGIN_ERROR, payload: err }),
                newPasswordRequired: () => dispatch({ type: UserActionTypes.USER_LOGIN_FORCE_CHANGE_PASSWORD }),
            });
        } catch (e) {
            dispatch(userError(e));
        }
    };
};

export const userChangePassword = (user: CognitoUser, newPassword: string) => async (dispatch: Dispatch<UserAction>) => {
    try {
        user.completeNewPasswordChallenge(newPassword, null, {
            onSuccess: session => dispatch(successLogin({ user, session })),
            onFailure: (err: any) => dispatch(userError(err)),
        });
    } catch (e) {
        dispatch(userError(e));
    }
};

export const firstLogin = (currentUser: CognitoUser | null) => {
    console.log('current user from first login: ', currentUser);
    if (!currentUser) return userLogout(null);

    return async (dispatch: Dispatch<UserAction>) => {
        try {
            currentUser.getSession((error: any, session: CognitoUserSession) => {
                console.log('get session err: ', error);
                if (error) {
                    dispatch(userError(error));
                    return;
                }

                const tokenExpire = session.getIdToken().getExpiration();
                console.log('decode payload:', session.getIdToken().decodePayload());
                console.log('expire number: ', tokenExpire);
                if (Date.now() > tokenExpire * 1000) {
                    console.log('token expire');
                    dispatch(userLogout(currentUser));
                    return;
                }
                console.log('success dispatch 1');
                dispatch(successLogin({ user: currentUser, session }));
            });
        } catch (e) {
            dispatch(userError(e));
        }
    };
};
