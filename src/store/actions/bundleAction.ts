import { Dispatch } from 'redux';
import { BundleAction, BundleActionTypes } from '../types/bundle';
import Bundle from '../../models/bundle';
import api from '../../api';

export const fetchBundles = () => (
    async (dispatch: Dispatch<BundleAction>) => {
        try {
            const res = await api.get<Bundle[]>('third-party-apps/urls');
            dispatch({ type: BundleActionTypes.FETCH_BUNDLES, payload: res.data });
        } catch (e) {
            dispatch({ type: BundleActionTypes.FETCH_BUNDLES_ERROR, payload: e.message });
        }
    }
);

export const addBundle = (bundle: Bundle) => ({ type: BundleActionTypes.ADD_BUNDLE, payload: bundle });
