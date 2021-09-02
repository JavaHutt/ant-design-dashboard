import { Dispatch } from 'redux';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { BundleAction, BundleActionTypes } from '../types/bundle';
import store from '../index';
import Bundle from '../../models/bundle';
import api from '../../api';

// TODO not sure, maybe it should return async function...
api.interceptors.request.use(req => {
    const { user } = store.getState();
    user.user!.getSession((error: any, session: CognitoUserSession) => {
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
        try {
            const res = await api.get<Bundle[]>('third-party-apps/bundles');
            dispatch({ type: BundleActionTypes.FETCH_BUNDLES, payload: res.data });
        } catch (e) {
            dispatch({ type: BundleActionTypes.FETCH_BUNDLES_ERROR, payload: e.message });
        }
    }
);

export const addBundle = (bundle: Bundle) => ({ type: BundleActionTypes.ADD_BUNDLE, payload: bundle });

export const deleteBundle = (key: string) => ({ type: BundleActionTypes.DELETE_BUNDLE, payload: key });
