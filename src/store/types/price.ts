import { AppsPrices, Price } from '../../models/price';

export interface PriceState {
    prices: Price[];
    defaultPrice: number;
    loading: boolean;
    error: null | string;
}

export enum PriceActionTypes {
    FETCH_PRICES = 'FETCH_PRICES',
}

interface FetchPricesAction {
    type: PriceActionTypes.FETCH_PRICES;
    payload: AppsPrices;
}

export type PriceAction = FetchPricesAction;
