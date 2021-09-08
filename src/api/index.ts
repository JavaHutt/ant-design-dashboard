const { REACT_APP_API_BASE_URL } = process.env;

const defaultApiOptions = {
    baseURL: REACT_APP_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
};

export default defaultApiOptions;
