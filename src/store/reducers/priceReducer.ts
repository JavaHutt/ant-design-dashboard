import { PriceState, PriceAction, PriceActionTypes } from '../types/price';

const defaultState: PriceState = {
    prices: [],
    defaultPrice: 0,
    loading: false,
    error: null,
};

const priceReducer = (state = defaultState, action: PriceAction): PriceState => {
    switch (action.type) {
    case PriceActionTypes.FETCH_PRICES: {
        const { prices, default_price: defaultPrice } = action.payload;
        return { ...state, prices, defaultPrice, loading: false, error: null };
    }
    case PriceActionTypes.FETCH_PRICES_ERROR: {
        return { ...state, error: action.payload };
    }
    default:
        return state;
    }
};

export default priceReducer;
