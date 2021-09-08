import { Dispatch } from 'redux';
import axios from 'axios';
import { DefaultPriceAction, DefaultPriceActionTypes } from '../types/defaultPrice';
import { DefaultPrice } from '../../models/price';
import defaultApiOptions from '../../api';
import { RootState } from '../reducers';

export const fetchDefaultPrice = () => {
    const api = axios.create(defaultApiOptions);

    return async (dispatch: Dispatch<DefaultPriceAction>, getState: () => RootState) => {
        api.interceptors.request.use(req => {
            const { user } = getState();
            const token = user.user?.getSignInUserSession()?.getIdToken().getJwtToken();
            req.headers = {
                Authorization: `Bearer ${token}`,
            };
            return req;
        });

        try {
            const res = await api.get<DefaultPrice>('third-party-apps/default-price');
            dispatch({ type: DefaultPriceActionTypes.FETCH_DEFAULT_PRICE, payload: res.data });
        } catch (e) {
            dispatch({ type: DefaultPriceActionTypes.FETCH_DEFAULT_PRICE_ERROR, payload: e.message });
        }
    };
};

export const changeDefaultPrice = (defaultPrice: DefaultPrice) => {
    const api = axios.create(defaultApiOptions);

    return async (dispatch: Dispatch<DefaultPriceAction>, getState: () => RootState) => {
        api.interceptors.request.use(req => {
            const { user } = getState();
            const token = user.user?.getSignInUserSession()?.getIdToken().getJwtToken();
            req.headers = {
                Authorization: `Bearer ${token}`,
            };
            return req;
        });

        try {
            await api.post<DefaultPrice>('third-party-apps/default-price', defaultPrice);
            dispatch({ type: DefaultPriceActionTypes.CHANGE_DEFAULT_PRICE, payload: defaultPrice });
        } catch (e) {
            dispatch({ type: DefaultPriceActionTypes.CHANGE_DEFAULT_PRICE_ERROR, payload: e.message });
        }
    };
};
