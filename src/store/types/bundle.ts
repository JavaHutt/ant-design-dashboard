import Bundle from '../../models/bundle';

export interface BundleState {
    bundles: Bundle[];
    loading: boolean;
    error: null | string;
}

export enum BundleActionTypes {
    FETCH_BUNDLES = 'FETCH_BUNDLES',
    FETCH_BUNDLES_ERROR = 'FETCH_BUNDLES_ERROR',
    ADD_BUNDLE = 'ADD_BUNDLE',
}

interface FetchBundlesAction {
    type: BundleActionTypes.FETCH_BUNDLES;
    payload: Bundle[];
}

interface FetchBundlesErrorAction {
    type: BundleActionTypes.FETCH_BUNDLES_ERROR;
    payload: string;
}

interface AddBundleAction {
    type: BundleActionTypes.ADD_BUNDLE;
    payload: Bundle;
}

export type BundleAction = FetchBundlesAction | FetchBundlesErrorAction | AddBundleAction;
