import { CognitoUserPool, ICognitoUserPoolData, CookieStorage } from 'amazon-cognito-identity-js';

const {
    REACT_APP_USER_POOL_ID: userPoolId,
    REACT_APP_USER_POOL_CLIENT_ID: clientId,
    REACT_APP_DOMAIN_URL: domain,
} = process.env;

const poolData: ICognitoUserPoolData = {
    UserPoolId: userPoolId!,
    ClientId: clientId!,
    Storage: new CookieStorage({ domain: domain!, secure: false }),
};

export default new CognitoUserPool(poolData);
