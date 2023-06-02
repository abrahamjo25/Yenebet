import getConfig from 'next/config';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import AppBreadcrumb from './AppBreadCrumb';
import UserService from '../services/userService';
import { Controller, useForm } from 'react-hook-form';
import { LayoutContext } from './context/layoutcontext';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import { Ripple } from 'primereact/ripple';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
const AppTopbar = forwardRef((props, ref) => {
    let emptyModel = {
        oldPass: '',
        newPass: '',
        confirmPass: ''
    };
    const { onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const router = useRouter();
    const [result, setResult] = useState(emptyModel);
    const [changePasswordDialog, setChangePasswordDialog] = useState(false);
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: { ...emptyModel }
    });
    const toast = useRef(null);
    const Service = new UserService();
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current
    }));
    const op = useRef(null);
    const handleLogoutEvent = () => {
        localStorage.removeItem('userRefreashToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('idToken');
        localStorage.removeItem('fullname');
        localStorage.removeItem('username');
        localStorage.removeItem('roles');
        router.push('/');
    };
    const hidechangepasswordDialog = () => {
        setChangePasswordDialog(false);
        setResult(emptyModel);
    };
    const changePassword = () => {
        setChangePasswordDialog(true);
    };
    const submitPassword = (data) => {
        debugger;
        let requestBody = result;
        Service.changePassword(requestBody, 'change-password')
            .then((res) => {
                RefreshTable();
                toast.current.show({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: 'Successfully changed password',
                    life: 4000
                });
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: `${err.response.data.errors[0]}`, life: 4000 });
            })
            .finally(() => {
                setResult(emptyModel);
                10;
            });
    };

    const changePasswordDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hidechangepasswordDialog} />
            <Button label="change" icon="pi pi-check" className="p-button-raised" onClick={submitPassword} />
        </>
    );
    return (
        <div className="layout-topbar">
            <div className="topbar-start">
                <button ref={menubuttonRef} type="button" className="topbar-menubutton p-link p-trigger" onClick={onMenuToggle}>
                    <i className="pi pi-bars"></i>
                </button>

                <AppBreadcrumb className="topbar-breadcrumb"></AppBreadcrumb>
            </div>
            <Dialog visible={changePasswordDialog} style={{ width: '20vw', height: '45vh' }} header={'Change Password'} modal className="p-fluid" footer={changePasswordDialogFooter} onHide={hidechangepasswordDialog}>
                <div className="field">
                    <label htmlFor="oldPass">Old Password *</label>
                    <Controller
                        name="oldPass"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <InputText type="password" id="oldPass" value={field.value} onChange={field.onChange} required placeholder="enter old password" {...field} />}
                    />
                    {errors.oldPass?.type === 'required' && <small className="p-error">Old password is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="newPass">New Password *</label>
                    <Controller
                        name="newPass"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Password id="newPass" value={field.value} onChange={field.onChange} toggleMask required placeholder="enter new Password" {...field} />}
                    />
                    {errors.newPass?.type === 'required' && <small className="p-error">New Passwordis required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="confirmPass">Confirm Password *</label>
                    <Controller name="confirmPass" control={control} render={({ field }) => <Password id="confirmPass" value={field.value} onChange={field.onChange} required placeholder="confirm password" {...field} />} />
                    {errors.confirmPass?.type === 'required' && <small className="p-error"> Confirm Password is required.</small>}
                </div>
            </Dialog>
            <div className="topbar-end">
                <ul className="topbar-menu">
                    <li className="topbar-search">
                        <span className="p-input-icon-left">{/* {localStorage.getItem("fullname")?localStorage.getItem("fullname"):null} */}</span>
                    </li>
                    <li className="topbar-profile">
                        <button type="button" className="p-link" onClick={(e) => op.current.toggle(e)}>
                            <img src={`${contextPath}/layout/images/avatar1.png`} alt="Profile" />
                        </button>

                        <OverlayPanel ref={op}>
                            <div className="flex flex-column gap-2">
                                <Button label="Change Password" icon="pi pi-user-edit" style={{ backgroundColor: '#20a77c' }} className="login-btn" onClick={() => changePassword()}>
                                    <Ripple />
                                </Button>
                                <Button label="Logout" icon="pi pi-power-off" style={{ backgroundColor: '#20a77c' }} onClick={() => handleLogoutEvent()} className="login-btn"></Button>
                            </div>
                        </OverlayPanel>
                    </li>
                </ul>
            </div>
        </div>
    );
});

export default AppTopbar;
