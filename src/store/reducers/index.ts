import { combineReducers } from 'redux';
import bundleReducer from './bundleReducer';
import priceReducer from './priceReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
    bundle: bundleReducer,
    price: priceReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
