import { UserState, UserAction, UserActionTypes } from '../types/user';

const defaultState: UserState = {
    user: null,
    isLoggedIn: false,
    forceChangePassword: false,
    error: null,
};

const priceReducer = (state = defaultState, action: UserAction): UserState => {
    switch (action.type) {
    case UserActionTypes.USER_LOGIN: {
        return { ...state, user: action.payload, error: null };
    }
    case UserActionTypes.USER_LOGIN_FORCE_CHANGE_PASSWORD: {
        return { ...state, error: null, forceChangePassword: true };
    }
    case UserActionTypes.USER_LOGIN_CHANGE_PASSWORD: {
        return { ...state, error: null, forceChangePassword: false, isLoggedIn: true };
    }
    case UserActionTypes.USER_LOGIN_SUCCESS: {
        return { ...state, error: null, forceChangePassword: false, isLoggedIn: true };
    }
    case UserActionTypes.USER_LOGIN_ERROR: {
        return { ...state, error: action.payload };
    }
    case UserActionTypes.USER_LOGOUT: {
        return { ...state, error: null, isLoggedIn: false, user: null };
    }
    default:
        return state;
    }
};

export default priceReducer;
