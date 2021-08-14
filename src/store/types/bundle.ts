import Bundle from '../../models/bundle';

export interface BundleState {
    bundles: Bundle[];
    loading: boolean;
    error: null | string;
}

export enum BundleActionTypes {
    FETCH_BUNDLES = 'FETCH_BUNDLES',
    ADD_BUNDLE = 'ADD_BUNDLE',
}

interface FetchBundlesAction {
    type: BundleActionTypes.FETCH_BUNDLES;
    payload: Bundle[];
}

interface AddBundleAction {
    type: BundleActionTypes.ADD_BUNDLE;
    payload: Bundle;
}

export type BundleAction = FetchBundlesAction | AddBundleAction;
