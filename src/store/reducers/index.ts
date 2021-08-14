import { combineReducers } from 'redux';
import bundleReducer from './bundleReducer';

export const rootReducer = combineReducers({
    bundle: bundleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
