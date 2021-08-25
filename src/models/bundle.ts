import { CountryPrice } from './price';

interface Bundle {
    id: number;
    app_name: string;
    app_url: string;
    price_for_app?: number;
    price_for_app_by_country?: CountryPrice[];
}

export default Bundle;
