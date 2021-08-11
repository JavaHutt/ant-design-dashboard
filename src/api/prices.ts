import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8004',
    headers: { 'Content-Type': 'application/json' },
    auth: {
        username: 'root',
        password: '****',
    },
});
