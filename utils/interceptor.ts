import env from '@/libs/env';
import axios from 'axios';

const interceptor = axios.create({
    baseURL: env.apiUrl,
});

export default interceptor;
