import { CognitoUser } from "amazon-cognito-identity-js";

export interface LoginValues {
    username: string;
    password: string;
}

export enum UserGroups {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_USER = 'ROLE_USER',
}

export const isAdmin = (groups: UserGroups[]) => groups.includes(UserGroups.ROLE_ADMIN);
export const isUser = (groups: UserGroups[]) => groups.includes(UserGroups.ROLE_USER);
