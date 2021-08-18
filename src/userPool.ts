import { CognitoUserPool, ICognitoUserPoolData, CookieStorage } from 'amazon-cognito-identity-js';

const { REACT_APP_USER_POOL_ID: UserPoolId, REACT_APP_USER_POOL_CLIENT_ID: ClientId } = process.env;

const poolData: ICognitoUserPoolData = {
    UserPoolId: UserPoolId!,
    ClientId: ClientId!,
    Storage: new CookieStorage({ domain: 'localhost', secure: false }),
};

export default new CognitoUserPool(poolData);
