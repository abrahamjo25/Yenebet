import React, { useEffect, useState } from 'react';
import { classNames } from 'primereact/utils';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import secureLocalStorage from 'react-secure-storage';
import axiosInstance, { refreashSystemToken } from '../../utilities/axios';
import { useRouter } from 'next/router';

function Login() {
    const [loading, setLoading] = useState(false);
    const [loginInput, setLoginInput] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [checked, setChecked] = useState(true);
    const [accessToken, setAccessToken] = useState(null);
    const clientLogin = {
        clientId: 'Coachingweb',
        clientSecret: 'Abcd@1234'
    };
    const router = useRouter();
    // useEffect(() => {
    //     const accessToken = secureLocalStorage.getItem('accessToken');
    //     if (accessToken === null || accessToken === '') {
    //         refreashSystemToken();
    //     }
    //     if (!secureLocalStorage.getItem('idToken')) {
    //         router.push('/');
    //     }
    // }, []);
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _result = { ...loginInput };
        _result[`${name}`] = val;
        setLoginInput(_result);
    };
    const submitLogin = (e) => {
        setSubmitted(true);
        e.preventDefault();
        if (loginInput.username && loginInput.password) {
            setSubmitted(false);
            setLoading(true);
            axiosInstance
                .post(
                    '/api/v1/User/Login',
                    {
                        username: loginInput.username,
                        password: loginInput.password
                    },
                    {
                        headers: {
                            accessToken: secureLocalStorage.getItem('accessToken')
                        }
                    }
                )
                .then((resp) => {
                    const idToken = resp.data.idToken;
                    const refreashToken = resp.data?.refreshToken;
                    const fullname = resp.data.firstName + ' ' + resp.data.lastName;
                    const username = resp.data.username;
                    const roles = [];
                    resp.data?.roles.map((value) => {
                        value?.claims?.map((ro) => {
                            const claim = ro?.claim;
                            roles.push(claim);
                        });
                    });

                    secureLocalStorage.setItem('fullname', fullname);
                    secureLocalStorage.setItem('username', username);
                    secureLocalStorage.setItem('userRefreashToken', refreashToken);
                    secureLocalStorage.setItem('roles', roles.join(','));
                    secureLocalStorage.setItem('idToken', idToken);
                    sessionStorage.setItem('idToken', idToken);
                    secureLocalStorage.setItem('isAuthenticated', true);
                    // localStorage.setItem("tokenCollection", JSON.stringify(tokenCollection));

                    router.push('/dashboard');

                    setLoading(false);
                })
                .catch((err) => {
                    if (err.code === 'ERR_NETWORK') {
                        toast.current?.show({
                            severity: 'error',
                            summary: 'Network Error',
                            detail: 'check your internet connection please !',
                            life: 3000
                        });
                    } else {
                        showError();
                    }
                    setLoading(false);
                });
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // 👇️
            submitLogin(event);
        }
    };
    const backToHome = () => {
        router.push('/');
    };
    return (
        <>
            <div className="px-5 min-h-screen flex justify-content-center align-items-center">
                <div className="card border ">
                    <div className="text-center mb-5">
                        {/* <img src="assets/layout/images/et-logo.png" alt="hyper" height="100" width="250" className="mb-3" /> */}
                        <div className="text-900 text-3xl font-medium mb-3">
                            <h3>
                                <div className="pi pi-arrow-left" onClick={backToHome}></div>
                                <span style={{ color: '#6366F1' }}> Yene</span>Bet
                            </h3>
                        </div>
                        <span className="text-600 font-medium line-height-3"> Login to your account to start session</span>
                    </div>
                    <br />
                    <div className="text-success text-center">
                        <span className="text-danger">
                            <h6>{error}</h6>
                        </span>
                        <div className="grid">
                            <span className="lg:col-1"></span>
                            <div className="lg:col-10">
                                <div className="field">
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-user" />
                                        <InputText
                                            id="username"
                                            placeholder=" User Name"
                                            value={loginInput.username}
                                            onChange={(e) => onInputChange(e, 'username')}
                                            onKeyDown={handleKeyDown}
                                            required
                                            autoFocus
                                            className={classNames({ 'p-invalid': submitted && !loginInput.username })}
                                        />
                                    </span>
                                </div>
                                <div className="field">
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-fw pi-lock" />
                                        <InputText
                                            id="password"
                                            type="password"
                                            placeholder=" Password"
                                            value={loginInput.password}
                                            onChange={(e) => onInputChange(e, 'password')}
                                            onKeyDown={handleKeyDown}
                                            required
                                            className={classNames({ 'p-invalid': submitted && !loginInput.password })}
                                        />
                                    </span>
                                </div>
                                <div className="col-12 d-grid">{loading ? <Button label="Sign in" icon="pi pi-spin pi-spinner" disabled={true} /> : <Button label="Sign in" icon="pi pi-sign-in" onClick={(e) => submitLogin(er)} />}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
Login.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};
export default Login;
