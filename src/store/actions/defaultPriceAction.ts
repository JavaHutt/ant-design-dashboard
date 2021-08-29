import { Dispatch } from 'redux';
import { DefaultPriceAction, DefaultPriceActionTypes } from '../types/defaultPrice';
import { DefaultPrice } from '../../models/price';
import api from '../../api';

export const fetchDefaultPrice = () => (
    async (dispatch: Dispatch<DefaultPriceAction>) => {
        try {
            const res = await api.get<DefaultPrice>('third-party-apps/default-price');
            dispatch({ type: DefaultPriceActionTypes.FETCH_DEFAULT_PRICE, payload: res.data });
        } catch (e) {
            dispatch({ type: DefaultPriceActionTypes.FETCH_DEFAULT_PRICE_ERROR, payload: e.message });
        }
    }
);

export const changeDefaultPrice = (defaultPrice: DefaultPrice) => (
    async (dispatch: Dispatch<DefaultPriceAction>) => {
        try {
            await api.post<DefaultPrice>('third-party-apps/default-price', defaultPrice);
            dispatch({ type: DefaultPriceActionTypes.CHANGE_DEFAULT_PRICE, payload: defaultPrice });
        } catch (e) {
            dispatch({ type: DefaultPriceActionTypes.CHANGE_DEFAULT_PRICE_ERROR, payload: e.message });
        }
    }
);
