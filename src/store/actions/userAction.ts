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
    user?.signOut();
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
                onFailure: (err: any) => dispatch(userError(err)),
                newPasswordRequired: () => dispatch({ type: UserActionTypes.USER_LOGIN_FORCE_CHANGE_PASSWORD }),
            });
        } catch (e) {
            dispatch(userError(e));
        }
    };
};

export const userChangePassword = (user: CognitoUser, newPassword: string) => (
    async (dispatch: Dispatch<UserAction>) => {
        try {
            user.completeNewPasswordChallenge(newPassword, null, {
                onSuccess: session => dispatch(successLogin({ user, session })),
                onFailure: (err: any) => dispatch(userError(err)),
            });
        } catch (e) {
            dispatch(userError(e));
        }
    }
);

export const firstLogin = (currentUser: CognitoUser | null) => {
    console.log('current user from first login: ', currentUser);
    if (!currentUser) return userLogout(null);

    return async (dispatch: Dispatch<UserAction>) => {
        try {
            currentUser.getSession((error: any, session: CognitoUserSession) => {
                if (error) {
                    dispatch(userError(error));
                    return;
                }
                // TODO it seems like id token stays valid for a while after logout..
                // I should consider try access token
                const tokenExpire = session.getIdToken().getExpiration();
                if (Date.now() > tokenExpire * 1000) {
                    dispatch(userLogout(currentUser));
                    return;
                }
                dispatch(successLogin({ user: currentUser, session }));
            });
        } catch (e) {
            dispatch(userError(e));
        }
    };
};
