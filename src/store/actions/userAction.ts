import { Dispatch } from 'redux';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../../userPool';
import { UserAction, UserActionTypes } from '../types/user';
import LoginValues from '../../models/user';

export const userLogin = ({ username, password }: LoginValues) => {
    const user = new CognitoUser({
        Username: username,
        Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
    });

    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.USER_LOGIN, payload: user });
            user.authenticateUser(authDetails, {
                onSuccess: () => dispatch({ type: UserActionTypes.USER_LOGIN_SUCCESS }),
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
            onSuccess: () => dispatch({ type: UserActionTypes.USER_LOGIN_CHANGE_PASSWORD }),
            onFailure: (err: any) => dispatch({ type: UserActionTypes.USER_LOGIN_ERROR, payload: err }),
        });
    } catch (e) {
        dispatch({ type: UserActionTypes.USER_LOGIN_ERROR, payload: e });
    }
};
