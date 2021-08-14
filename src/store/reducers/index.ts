import { combineReducers } from 'redux';
import bundleReducer from './bundleReducer';
import priceReducer from './priceReducer';

export const rootReducer = combineReducers({
    bundle: bundleReducer,
    price: priceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
