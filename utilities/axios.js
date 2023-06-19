import axios from 'axios';
import { useEffect } from 'react';

const Urlheader = process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL;
const clientId = process.env.NEXT_PUBLIC_API_SERVICE_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_API_SERVICE_CLIENT_SECRECT;

const baseURL = Urlheader ? Urlheader : 'https://localhost:7138';

export const SystemToken = () => {
    const Url = baseURL + '/api/v1/Client/Login';
    useEffect(async () => {
        getSystemToken();
    }, []);

    const getSystemToken = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken === null || accessToken === '') {
            axios
                .post(Url, {
                    clientId: clientId,
                    clientSecret: clientSecret
                })
                .then(function (response) {
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    console.log('respppp', response);
                })
                .catch(function (error) {
                    // logoutUser()
                    //   if(error.toJSON().message==='Network Error')
                    //   {
                    //     alert('No Internet Connection');
                    //   }
                    console.log('error', error.toJSON());
                });
        }
    };
};
export const refreashSystemToken = () => {
    const Url = baseURL + '/api/v1/Client/login';
    // const accessToken = localStorage.getItem("accessToken");
    // if (accessToken === null || accessToken === "") {
    axios
        .post(Url, {
            clientId: clientId,
            clientSecret: clientSecret
        })
        .then(function (response) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            console.log('res1', response.data);
        })
        .catch(function (error) {
            logoutUser();
        });
    // }
};
export const refreshToken = () => {
    const re = localStorage.getItem('refreash');
    if (re === 'false') {
        return;
    }
    localStorage.setItem('refreash', false);
    axiosInstance
        .post(`${baseURL}/api/v1/User/RefreshToken`, { token: localStorage.getItem('userRefreashToken') }, { headers: { accessToken: localStorage.getItem('accessToken') } })
        .then((response) => {
            localStorage.setItem('userRefreashToken', response.data?.payload.refreshToken);
            localStorage.setItem('idToken', response.data?.payload.idToken);
            window.location.reload();
        })
        .catch((error) => {
            logoutUser();
        })
        .finally(() => {
            localStorage.setItem('refreash', true);
        });
};

const logoutUser = () => {
    // localStorage.removeItem("userRefreashToken")
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("idToken");
    // localStorage.removeItem("tokenCollection");
    // localStorage.removeItem("refreshToken")
    // localStorage.removeItem("fullname");
    // localStorage.removeItem("username");
    // localStorage.removeItem("roles")
    localStorage.clear();
};

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7294/api',
    headers: {
        'Access-Control-Allow-Credentials': true,
        'access-control-allow-origin': '*',
        'Access-Control-Allow-Headers': 'accesstoken, clientclaim',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWJyYWhhbWpvIiwianRpIjoiMTIxNmU1OGMtYjdjMC00YTIyLThlYTctYmZkYjg4MzUxMjEyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFkbWluIiwiVXNlciJdLCJleHAiOjE2ODY5MDI3ODMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.r3742Acj2YdIwFJQYlWxdII3DXvyLeXeP1Zek4uHS4c'
    }
});

axiosInstance.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response);
        }),
    (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }

        if (error.response.data.message === null) {
            logoutUser();
        }

        if (error.response.data.message === '101') {
            refreashSystemToken();
        } else if (error.response.data.message === '103') {
            refreshToken();
        } else if (error.response.data.message === '102' || error.response.data.message === '104') {
            // window.location.hash = "#/access"
        }
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
);

export default axiosInstance;
