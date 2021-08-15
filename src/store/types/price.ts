import { AppsPrices, Price } from '../../models/price';

export interface PriceState {
    prices: Price[];
    defaultPrice: number;
    loading: boolean;
    error: null | string;
}

export enum PriceActionTypes {
    FETCH_PRICES = 'FETCH_PRICES',
    FETCH_PRICES_ERROR = 'FETCH_PRICES_ERROR',
}

interface FetchPricesAction {
    type: PriceActionTypes.FETCH_PRICES;
    payload: AppsPrices;
}

interface FetchPricesErrorAction {
    type: PriceActionTypes.FETCH_PRICES_ERROR;
    payload: string;
}

export type PriceAction = FetchPricesAction | FetchPricesErrorAction;
