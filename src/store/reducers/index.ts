import { combineReducers } from 'redux';
import bundleReducer from './bundleReducer';
import defaultPriceReducer from './defaultPriceReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
    bundle: bundleReducer,
    defaultPrice: defaultPriceReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
