import { UserState, UserAction, UserActionTypes } from '../types/user';
import userPool from '../../userPool';

const defaultState: UserState = {
    user: userPool.getCurrentUser(),
    groups: [],
    isLoggedIn: false,
    forceChangePassword: false,
    loading: false,
    error: null,
};

const priceReducer = (state = defaultState, action: UserAction): UserState => {
    switch (action.type) {
    case UserActionTypes.USER_LOGIN_REQUEST: {
        return { ...state, user: action.payload, error: null, loading: true };
    }
    case UserActionTypes.USER_LOGIN_FORCE_CHANGE_PASSWORD: {
        return { ...state, error: null, forceChangePassword: true, loading: false };
    }
    case UserActionTypes.USER_LOGIN_CHANGE_PASSWORD: {
        return { ...state, error: null, forceChangePassword: false, isLoggedIn: true, loading: false };
    }
    case UserActionTypes.USER_LOGIN_SUCCESS: {
        const { user, session } = action.payload;
        const groups = session.getIdToken().decodePayload()['cognito:groups'] ?? [];

        return { ...state, error: null, forceChangePassword: false, isLoggedIn: true, user, groups, loading: false };
    }
    case UserActionTypes.USER_LOGIN_ERROR: {
        return { ...state, error: action.payload, loading: false };
    }
    case UserActionTypes.USER_LOGOUT: {
        return { ...state, error: null, isLoggedIn: false, user: null, groups: [], loading: false };
    }
    default:
        return state;
    }
};

export default priceReducer;
