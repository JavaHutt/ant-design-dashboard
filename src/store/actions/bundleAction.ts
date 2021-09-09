import { Dispatch } from 'redux';
import axios from 'axios';
import { BundleAction, BundleActionTypes } from '../types/bundle';
import Bundle from '../../models/bundle';
import defaultApiOptions from '../../api';
import { RootState } from '../reducers';

export const fetchBundles = () => {
    const api = axios.create(defaultApiOptions);

    return async (dispatch: Dispatch<BundleAction>, getState: () => RootState) => {
        dispatch({ type: BundleActionTypes.FETCH_BUNDLES_REQUEST });

        api.interceptors.request.use(req => {
            const { user } = getState();
            const token = user.user?.getSignInUserSession()?.getIdToken().getJwtToken();
            req.headers = {
                Authorization: `Bearer ${token}`,
            };
            return req;
        });

        try {
            const res = await api.get<Bundle[]>('third-party-apps/bundles');
            dispatch({ type: BundleActionTypes.FETCH_BUNDLES_SUCCESS, payload: res.data });
        } catch (e) {
            dispatch({
                type: BundleActionTypes.FETCH_BUNDLES_ERROR,
                payload: `Error fetching bundles: ${e.message}`,
            });
        }
    };
};

export const addBundle = (bundle: Bundle) => {
    const api = axios.create(defaultApiOptions);

    return async (dispatch: Dispatch<BundleAction>, getState: () => RootState) => {
        dispatch({ type: BundleActionTypes.ADD_BUNDLE_REQUEST });

        api.interceptors.request.use(req => {
            const { user } = getState();
            const token = user.user?.getSignInUserSession()?.getIdToken().getJwtToken();
            req.headers = {
                Authorization: `Bearer ${token}`,
            };
            return req;
        });

        try {
            const res = await api.post<Bundle>('third-party-apps/bundles', bundle);
            dispatch({ type: BundleActionTypes.ADD_BUNDLE_SUCCESS, payload: res.data });
        } catch (e) {
            dispatch({ type: BundleActionTypes.ADD_BUNDLE_ERROR, payload: `Error adding bundle: ${e.message}` });
        }
    };
};

export const deleteBundle = (id: number) => {
    const api = axios.create(defaultApiOptions);

    return async (dispatch: Dispatch<BundleAction>, getState: () => RootState) => {
        dispatch({ type: BundleActionTypes.DELETE_BUNDLE_REQUEST });

        api.interceptors.request.use(req => {
            const { user } = getState();
            const token = user.user?.getSignInUserSession()?.getIdToken().getJwtToken();
            req.headers = {
                Authorization: `Bearer ${token}`,
            };
            return req;
        });

        try {
            await api.delete(`third-party-apps/bundles/${id}`);
            dispatch({ type: BundleActionTypes.DELETE_BUNDLE_SUCCESS, payload: id });
        } catch (e) {
            dispatch({ type: BundleActionTypes.DELETE_BUNDLE_ERROR, payload: `Error deleting bundle: ${e.message}` });
        }
    };
};
