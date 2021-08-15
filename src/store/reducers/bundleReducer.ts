import { BundleState, BundleAction, BundleActionTypes } from '../types/bundle';

const defaultState: BundleState = {
    bundles: [],
    loading: false,
    error: null,
};

const bundleReducer = (state = defaultState, action: BundleAction) => {
    switch (action.type) {
    case BundleActionTypes.FETCH_BUNDLES:
        return { ...state, bundles: action.payload, loading: false, error: null };
    case BundleActionTypes.FETCH_BUNDLES_ERROR:
        return { ...state, error: action.payload };
    case BundleActionTypes.ADD_BUNDLE:
        return { ...state, bundles: [...state.bundles, action.payload], loading: false, error: null };
    default:
        return state;
    }
};

export default bundleReducer;
