import axios from 'axios';

const { REACT_APP_API_USER_NAME: username, REACT_APP_API_PASSWORD: password } = process.env;

export default axios.create({
    baseURL: 'http://localhost:8004',
    headers: { 'Content-Type': 'application/json' },
    // auth: {
    //     username: username || 'username',
    //     password: password || 'password',
    // },
});
