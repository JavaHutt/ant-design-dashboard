interface Price {
    app_name: string;
	price_for_app: number;
	price_for_app_by_country?: {
        country: string;
        price: number;
    };
}

export default Price;
