import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { UserGroups } from '../../models/user';

export interface UserState {
    user: CognitoUser | null;
    groups: UserGroups[];
    isLoggedIn: boolean;
    forceChangePassword: boolean;
    error: any;
}

export enum UserActionTypes {
    USER_LOGIN = 'USER_LOGIN',
    USER_LOGIN_FORCE_CHANGE_PASSWORD = 'USER_LOGIN_FORCE_CHANGE_PASSWORD',
    USER_LOGIN_CHANGE_PASSWORD = 'USER_LOGIN_CHANGE_PASSWORD',
    USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    USER_LOGIN_ERROR = 'USER_LOGIN_ERROR',
    USER_LOGOUT = 'USER_LOGOUT',
}

interface UserLoginAction {
    type: UserActionTypes.USER_LOGIN;
    payload: CognitoUser;
}

interface UserLoginForceChangePasswordAction {
    type: UserActionTypes.USER_LOGIN_FORCE_CHANGE_PASSWORD;
}

interface UserLoginChangePasswordAction {
    type: UserActionTypes.USER_LOGIN_CHANGE_PASSWORD;
}

interface UserLoginSuccessAction {
    type: UserActionTypes.USER_LOGIN_SUCCESS;
    payload: {
        user: CognitoUser,
        session: CognitoUserSession,
    };
}

interface UserLoginErrorAction {
    type: UserActionTypes.USER_LOGIN_ERROR;
    payload: any;
}

interface UserLogoutAction {
    type: UserActionTypes.USER_LOGOUT;
}

export type UserAction =
    UserLoginAction |
    UserLoginForceChangePasswordAction |
    UserLoginChangePasswordAction |
    UserLoginSuccessAction |
    UserLoginErrorAction |
    UserLogoutAction;
