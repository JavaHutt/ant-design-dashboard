interface AppsPrices {
    default_price: number;
    prices: Price[];
}

interface Price {
    app_name: string;
    price_for_app: number;
    price_for_app_by_country?: CountryPrice[];
}

interface CountryPrice {
    country: string;
    price: number;
}

interface DefaultPrice {
    default_price: number;
}

export type {
    AppsPrices,
    Price,
    CountryPrice,
    DefaultPrice,
};
