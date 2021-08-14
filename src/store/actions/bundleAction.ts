import { Dispatch } from 'redux';
import { BundleAction, BundleActionTypes } from '../types/bundle';
import Bundle from '../../models/bundle';
import api from '../../api';

// eslint-disable-next-line
export const fetchBundles = () => (
    async (dispatch: Dispatch<BundleAction>) => {
        try {
            const res = await api.get<Bundle[]>('third-party-apps/urls');
            dispatch({ type: BundleActionTypes.FETCH_BUNDLES, payload: res.data });
        } catch (e) {
            console.log(e);
        }
    }
);

export const addBundle = (bundle: Bundle) => ({ type: BundleActionTypes.ADD_BUNDLE, payload: bundle });
