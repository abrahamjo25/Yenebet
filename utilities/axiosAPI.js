import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const baseURL = 'https://localhost:7294/api';

export const getToken = () => (secureLocalStorage.getItem('user') ? JSON.parse(secureLocalStorage.getItem('user')).token : null);

export const getAuthorizationHeader = () => (getToken ? `Bearer ${getToken()}` : '');

export const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: getAuthorizationHeader() }
});
