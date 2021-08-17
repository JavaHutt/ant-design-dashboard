import { CognitoUserPool, ICognitoUserPoolData } from 'amazon-cognito-identity-js';

const { REACT_APP_USER_POOL_ID: UserPoolId, REACT_APP_USER_POOL_CLIENT_ID: ClientId } = process.env;

const poolData: ICognitoUserPoolData = {
    UserPoolId: UserPoolId!,
    ClientId: ClientId!,
};

export default new CognitoUserPool(poolData);
