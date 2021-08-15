import { Dispatch } from 'redux';
import { PriceAction, PriceActionTypes } from '../types/price';
import { AppsPrices } from '../../models/price';
import api from '../../api';

// eslint-disable-next-line
export const fetchPrices = () => (
    async (dispatch: Dispatch<PriceAction>) => {
        try {
            const res = await api.get<AppsPrices>('third-party-apps/prices');
            dispatch({ type: PriceActionTypes.FETCH_PRICES, payload: res.data });
        } catch (e) {
            dispatch({ type: PriceActionTypes.FETCH_PRICES_ERROR, payload: e.message });
        }
    }
);
