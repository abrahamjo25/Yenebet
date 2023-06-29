import React, { useContext, useEffect, useRef, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { useRouter } from 'next/router';
import yenebet from './images/yenebet.png';
import Image from 'next/image';
import secureLocalStorage from 'react-secure-storage';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import RegisterService from '../../services/registerService';
import { MyContext } from '../context/yenebetContext';
function Header() {
    let loginResult = {
        username: null,
        password: null
    };
    const toast = useRef(null);
    const [login, setLogin] = useState(loginResult);
    const [signinDialog, setSigninDialog] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [token, setToken] = useState(null);
    useEffect(() => {
        setToken(JSON.parse(secureLocalStorage.getItem('user'))?.token);
        if (token) {
            setIsVisible(true);
        }
    }, [token]);
    const service = new RegisterService();
    const router = useRouter();
    const { username } = useContext(MyContext);
    const nestedMenuitemsGuest = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-table',
            command: () => {
                router.push('/');
            }
        },
        {
            label: 'Packeges',
            icon: 'pi pi-fw pi-shopping-cart',
            command: () => {
                router.push('/component/packages');
            }
        },
        // {
        //     label: 'Register',
        //     icon: 'pi pi-user-edit',
        //     command: () => {
        //         router.push('component/register');
        //     }
        // },
        {
            label: 'Login',
            icon: 'pi pi-sign-in',
            command: () => {
                openSignIn();
            }
        }
    ];
    const nestedMenuitemsUser = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-table',
            command: () => {
                router.push('/');
            }
        },
        {
            label: 'Packeges',
            icon: 'pi pi-fw pi-shopping-cart',
            command: () => {
                router.push('/component/packages');
            }
        },

        {
            label: 'Transaction',
            icon: 'pi pi-fw pi-envelope',
            command: () => {
                router.push('/component/transaction');
            }
        },
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            command: () => {
                router.push('/component/profile');
            }
        },
        {
            label: 'Task',
            icon: 'pi pi-bars',
            command: () => {
                router.push('/component/task');
            }
        }
    ];
    const openSignIn = () => {
        setSubmitted(false);
        setSigninDialog(true);
    };
    const onLoginChange = (e, name) => {
        let val = (e.target && e.target.value) || '';
        let _result = { ...login };
        _result[`${name}`] = val;
        setLogin(_result);
    };
    const loginUser = () => {
        setSubmitted(true);
        if (login.username && login.password) {
            service
                .loginAccount(login)
                .then((res) => {
                    if (res) {
                        if (res.status === 200) {
                            console.log(res);
                            toast.current.show({ severity: 'success', summary: '', detail: 'Sign in Successful!', life: 4000 });
                            secureLocalStorage.setItem('user', JSON.stringify(res.data));
                            secureLocalStorage.setItem('token', res.data.token);
                            secureLocalStorage.setItem('exp', res.data.expiration);
                            secureLocalStorage.setItem('inviteCode', res.data.invoteCode);
                            secureLocalStorage.setItem('isAuthenticated', true);
                            localStorage.setItem("token",res.data.token)
                            router.push('/component/profile');
                        } else {
                            toast.current.show({ severity: 'error', summary: 'Error', detail: `${res.message || res.data.Message}`, life: 4000 });
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: `${err?.response?.data.message || 'Error occur, Unable to Login.'}`, life: 4000 });
                })
                .finally(() => {
                    signinHide();
                    setWaiting(false);
                });
        }
    };
    const signinHide = () => {
        setLogin(loginResult);
        setSigninDialog(false);
    };
    const signinFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={signinHide} />
            {waiting ? <Button label="Please Wait ..." icon="pi pi-spin pi-spinner"></Button> : <Button label="Sign In" icon="pi pi-sign-in" className="p-button-raised" onClick={loginUser} />}
        </>
    );
    const logOut = () => {
        secureLocalStorage.clear();
        router.push('/');
    };
    const menubarEndTemplate = () => {
        return (
            <>
                <span className="p-input-icon-left">{isVisible ? <Button label="Logout" icon="pi pi-sign-out" className="p-button-secondary p-button-text" onClick={(e) => logOut()} /> : ''}</span>
            </>
        );
    };
    return (
        <>
            <Image src={yenebet} height={60} width={200} alt="Logo" />
            <Menubar model={!isVisible ? nestedMenuitemsGuest : nestedMenuitemsUser} end={menubarEndTemplate}></Menubar>
            <Toast ref={toast} />
            <div className="col-12">
                <div className="flex flex-column sm:flex-row align-items-center gap-4">
                    <div className="flex flex-column sm:flex-row align-items-center gap-3">
                        <div className="flex flex-column align-items-center sm:align-items-start">
                            <span className="text-600 font-bold text-xl">{username ? `Loged In with ${username}` : ''}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 sm:ml-auto">
                        <p>Contact us on Telegram</p>
                        <a target="_blank" href="https://t.me/yenebet2023" rel="noopener noreferrer">
                            <Button type="button" tooltip="Press" tooltipOptions={{ position: 'bottom' }} icon="pi pi-send" className="p-button-rounded p-button-info" />
                        </a>
                    </div>
                </div>
            </div>
            <Dialog visible={signinDialog} style={{ width: '450px' }} header="Login to YeneBet" footer={signinFooter} onHide={signinHide}>
                <div className="p-fluid  grid card mt-2 ">
                    <span className=" flex flex-column  gap-2  col-10 ml-5">
                        <InputText id="username" name="username" value={login.username} onChange={(e) => onLoginChange(e, 'username')} placeholder="Phone" />
                        {submitted && !login.username && <span className="text-red-600">Phone number required!</span>}
                    </span>
                    <span className=" flex flex-column  gap-2  col-10 ml-5">
                        <InputText type="password" id="password" name="password" value={login.password} onChange={(e) => onLoginChange(e, 'password')} placeholder="password" />
                        {submitted && !login.password && <span className="text-red-600">Password required!</span>}
                    </span>
                </div>
            </Dialog>
        </>
    );
}

Header.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};

export default Header;
