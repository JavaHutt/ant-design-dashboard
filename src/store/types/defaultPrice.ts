import { DefaultPrice } from '../../models/price';

export interface DefaultPriceState {
    defaultPrice: DefaultPrice;
    loading: boolean;
    error: null | string;
}

export enum DefaultPriceActionTypes {
    FETCH_DEFAULT_PRICE = 'FETCH_DEFAULT_PRICE',
    FETCH_DEFAULT_PRICE_ERROR = 'FETCH_DEFAULT_PRICE_ERROR',
    CHANGE_DEFAULT_PRICE = 'CHANGE_DEFAULT_PRICE',
    CHANGE_DEFAULT_PRICE_ERROR = 'CHANGE_DEFAULT_PRICE_ERROR',
}

interface FetchDefaultPriceAction {
    type: DefaultPriceActionTypes.FETCH_DEFAULT_PRICE;
    payload: DefaultPrice;
}

interface FetchDefaultPriceErrorAction {
    type: DefaultPriceActionTypes.FETCH_DEFAULT_PRICE_ERROR;
    payload: string;
}

interface ChangeDefaultPriceAction {
    type: DefaultPriceActionTypes.CHANGE_DEFAULT_PRICE;
    payload: DefaultPrice;
}

interface ChangeDefaultPriceErrorAction {
    type: DefaultPriceActionTypes.CHANGE_DEFAULT_PRICE_ERROR;
    payload: string;
}

export type DefaultPriceAction =
    FetchDefaultPriceAction |
    FetchDefaultPriceErrorAction |
    ChangeDefaultPriceAction |
    ChangeDefaultPriceErrorAction;
