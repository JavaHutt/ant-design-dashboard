import { DefaultPriceState, DefaultPriceAction, DefaultPriceActionTypes } from '../types/defaultPrice';

const defaultState: DefaultPriceState = {
    defaultPrice: {
        default_price: 0,
    },
    loading: false,
    error: null,
};

const defaultPriceReducer = (state = defaultState, action: DefaultPriceAction): DefaultPriceState => {
    switch (action.type) {
    case DefaultPriceActionTypes.FETCH_DEFAULT_PRICE: {
        return { ...state, loading: false, error: null, defaultPrice: action.payload };
    }
    case DefaultPriceActionTypes.FETCH_DEFAULT_PRICE_ERROR: {
        return { ...state, loading: false, error: action.payload };
    }
    case DefaultPriceActionTypes.CHANGE_DEFAULT_PRICE: {
        return { ...state, loading: false, error: null, defaultPrice: action.payload };
    }
    case DefaultPriceActionTypes.CHANGE_DEFAULT_PRICE_ERROR: {
        return { ...state, loading: false, error: action.payload };
    }
    default:
        return state;
    }
};

export default defaultPriceReducer;
