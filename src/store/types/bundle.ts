import Bundle from '../../models/bundle';

export interface BundleState {
    bundles: Bundle[];
    loading: boolean;
    error: null | string;
}

export enum BundleActionTypes {
    FETCH_BUNDLES_REQUEST = 'FETCH_BUNDLES_REQUEST',
    FETCH_BUNDLES_SUCCESS = 'FETCH_BUNDLES_SUCCESS',
    FETCH_BUNDLES_ERROR = 'FETCH_BUNDLES_ERROR',
    ADD_BUNDLE_REQUEST = 'ADD_BUNDLE_REQUEST',
    ADD_BUNDLE_SUCCESS = 'ADD_BUNDLE_SUCCESS',
    ADD_BUNDLE_ERROR = 'ADD_BUNDLE_ERROR',
    DELETE_BUNDLE_REQUEST = 'DELETE_BUNDLE_REQUEST',
    DELETE_BUNDLE_SUCCESS = 'DELETE_BUNDLE_SUCCESS',
    DELETE_BUNDLE_ERROR = 'DELETE_BUNDLE_ERROR',
}

interface FetchBundlesRequestAction {
    type: BundleActionTypes.FETCH_BUNDLES_REQUEST;
}

interface FetchBundlesSuccessAction {
    type: BundleActionTypes.FETCH_BUNDLES_SUCCESS;
    payload: Bundle[];
}

interface FetchBundlesErrorAction {
    type: BundleActionTypes.FETCH_BUNDLES_ERROR;
    payload: string;
}

interface AddBundleRequestAction {
    type: BundleActionTypes.ADD_BUNDLE_REQUEST;
}

interface AddBundleSuccessAction {
    type: BundleActionTypes.ADD_BUNDLE_SUCCESS;
    payload: Bundle;
}

interface AddBundleErrorAction {
    type: BundleActionTypes.ADD_BUNDLE_ERROR;
    payload: string;
}

interface DeleteBundleRequestAction {
    type: BundleActionTypes.DELETE_BUNDLE_REQUEST;
}

interface DeleteBundleSuccessAction {
    type: BundleActionTypes.DELETE_BUNDLE_SUCCESS;
    payload: number;
}

interface DeleteBundleErrorAction {
    type: BundleActionTypes.DELETE_BUNDLE_ERROR;
    payload: string;
}

export type BundleAction = FetchBundlesRequestAction |
    FetchBundlesSuccessAction |
    FetchBundlesErrorAction |
    AddBundleRequestAction |
    AddBundleSuccessAction |
    AddBundleErrorAction |
    DeleteBundleRequestAction |
    DeleteBundleSuccessAction |
    DeleteBundleErrorAction;
