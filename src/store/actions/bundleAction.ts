import { Dispatch } from 'redux';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { BundleAction, BundleActionTypes } from '../types/bundle';
import store from '../index';
import Bundle from '../../models/bundle';
import api from '../../api';

// TODO not sure, maybe it should return async function...
api.interceptors.request.use(req => {
    console.log('interceptor invoked');
    const { user } = store.getState();
    user.user?.getSession((error: any, session: CognitoUserSession) => {
        if (error) console.log(error);
        const token = session.getIdToken().getJwtToken();
        req.headers = {
            Authorization: `Bearer ${token}`,
        };
    });
    return req;
});

export const fetchBundles = () => (
    async (dispatch: Dispatch<BundleAction>) => {
        dispatch({ type: BundleActionTypes.FETCH_BUNDLES_REQUEST });

        try {
            const res = await api.get<Bundle[]>('third-party-apps/bundles');
            dispatch({ type: BundleActionTypes.FETCH_BUNDLES_SUCCESS, payload: res.data });
        } catch (e) {
            dispatch({ type: BundleActionTypes.FETCH_BUNDLES_ERROR, payload: e.message });
        }
    }
);

export const addBundle = (bundle: Bundle) => (
    async (dispatch: Dispatch<BundleAction>) => {
        dispatch({ type: BundleActionTypes.ADD_BUNDLE_REQUEST });

        try {
            const res = await api.post<Bundle>('third-party-apps/bundles', bundle);
            dispatch({ type: BundleActionTypes.ADD_BUNDLE_SUCCESS, payload: res.data });
        } catch (e) {
            dispatch({ type: BundleActionTypes.ADD_BUNDLE_ERROR, payload: e.message });
        }
    }
);

export const deleteBundle = (id: number) => (
    async (dispatch: Dispatch<BundleAction>) => {
        dispatch({ type: BundleActionTypes.DELETE_BUNDLE_REQUEST });

        try {
            await api.delete(`third-party-apps/bundles/${id}`);
            dispatch({ type: BundleActionTypes.DELETE_BUNDLE_SUCCESS, payload: id });
        } catch (e) {
            dispatch({ type: BundleActionTypes.DELETE_BUNDLE_ERROR, payload: e.message });
        }
    }
);
