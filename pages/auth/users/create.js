import React, { useEffect, useState, useRef } from 'react';
import UserService from '../../../services/userService';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const create = () => {
    let emptyResult = {
        username: null,
        email: null,
        password: null
    };
    const [result, setResult] = useState(emptyResult);
    const [results, setResults] = useState(null);
    const [resultDialog, setResultDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const toast = useRef(null);
    const service = new UserService();
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        setLoading(true);
        service
            .GetAllUser()
            .then((res) => {
                setResults(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const onInputChange = (e, name) => {
        let val = (e.target && e.target.value) || '';
        let _result = { ...result };
        _result[`${name}`] = val;
        setResult(_result);
        if (name === 'password') {
            if (validatePassword(val)) {
                setPasswordError(false);
            }
        }
    };
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };
    const isphoneNumber = (phone) => {
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        return !(!phone || regex.test(phone) === false);
    };
    const validatePassword = (password) => {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (strongRegex.test(password)) {
            return true;
        } else {
            return false;
        }
    };
    const saveResult = () => {
        setSubmitted(true);
        if (result.username && result.email && result.password) {
            if (!isphoneNumber(result.username)) {
                setPhoneNumberError(true);
            } else {
                setPhoneNumberError(false);
                if (!isValidEmail(result.email)) {
                    setEmailError(true);
                } else {
                    setEmailError(false);
                    if (!validatePassword(result.password)) {
                        setPasswordError(true);
                    } else {
                        setPasswordError(false);
                        setWaiting(true);
                        service
                            .CreateUser(result)
                            .then((res) => {
                                if (res) {
                                    if (res.data.status === 3) {
                                        toast.current.show({ severity: 'success', summary: 'Success', detail: `${res.data.message}`, life: 4000 });
                                        fetchUser();
                                    } else {
                                        toast.current.show({ severity: 'error', summary: 'Error', detail: `${res.data.message || res.data.Message}`, life: 4000 });
                                    }
                                }
                            })
                            .catch((err) => {
                                toast.current.show({ severity: 'error', summary: 'Error', detail: `${err.response.data.message || 'Error occur, Unable to Register.'}`, life: 4000 });
                            })
                            .finally(() => {
                                setWaiting(false);
                                hideDialog();
                            });
                    }
                }
            }
        }
    };
    const updateStatus = (id) => {
        setWaiting(true);
        service
            .updateStatus(id)
            .then((res) => {
                if (res) {
                    if (res.data.status === 3) {
                        toast.current.show({ severity: 'success', summary: 'Success', detail: `${res.data.message}`, life: 4000 });
                        fetchUser();
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: `${res.data.message || res.data.Message}`, life: 4000 });
                    }
                }
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: `${err.response.data.message || 'Error occur, Unable to update status.'}`, life: 4000 });
            })
            .finally(() => {
                setWaiting(false);
            });
    };
    const openNew = () => {
        setResultDialog(true);
    };
    const hideDialog = () => {
        setSubmitted(false);
        setResultDialog(false);
        setResult(emptyResult);
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Create New" icon="pi pi-plus" onClick={openNew} />
                </div>
            </React.Fragment>
        );
    };
    const rightToolbarTemplate = () => {
        return <></>;
    };
    const statusBodyTamplate = (rowData) => {
        let text = '';
        let style = '';
        if (rowData.status === 1) {
            text = 'Active';
            style = 'customer-badge status-qualified';
        } else {
            text = 'Inactive';
            style = 'customer-badge status-unqualified';
        }
        return <span className={style}>{text}</span>;
    };
    const actionBodyTamplate = (rowData) => {
        if (rowData.status === 1) {
            return (
                <div className="actions">
                    <Button icon="pi pi-lock" className="p-button-rounded p-button-warning pl-1 mr-2" onClick={() => updateStatus(rowData.id)} />
                </div>
            );
        } else {
            return (
                <div className="actions">
                    <Button icon="pi pi-unlock" className="p-button-rounded p-button-danger pl-1 mr-2" onClick={() => updateStatus(rowData.id)} />
                </div>
            );
        }
    };
    const resultDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text btn-success" onClick={hideDialog} />
            {waiting ? <Button label="Saving" icon="pi pi-spin pi-spinner" disabled={true} /> : <Button label="Save" icon="pi pi-save" className="btn-danger" onClick={saveResult} />}
        </>
    );
    return (
        <>
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />
            <DataTable
                value={results}
                paginator
                rows={8}
                rowsPerPageOptions={[5, 10, 15]}
                dataKey="id"
                rowHover
                filterDisplay="menu"
                loading={loading}
                responsiveLayout="scroll"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                emptyMessage="No User found ."
                currentPageReportTemplate="Showing {first} - {last} of {totalRecords} Users"
            >
                <Column field="userName" header="Phone number" />
                <Column field="email" header="Email" />
                <Column field="status" header="Status" body={statusBodyTamplate} />
                <Column header="Action" body={actionBodyTamplate} />
            </DataTable>
            <Dialog visible={resultDialog} style={{ width: '700px' }} header="User" modal className="p-fluid" footer={resultDialogFooter} onHide={hideDialog}>
                <div className="p-fluid  grid card mt-2 ">
                    <span className=" flex flex-column  gap-2  col-10 ml-5">
                        <InputText id="username" name="username" value={result.username} onChange={(e) => onInputChange(e, 'username')} placeholder="Phone" />
                        {submitted && !result.username && <span className="text-red-600">Phone number required!</span>}
                        {submitted && phoneNumberError && <span className="text-red-600">Invalid Phone number!</span>}
                    </span>
                    <span className=" flex flex-column  gap-2  col-10 ml-5">
                        <InputText id="email" name="email" value={result.email} onChange={(e) => onInputChange(e, 'email')} placeholder="Email" />
                        {submitted && !result.email && <span className="text-red-600">Email required!</span>}
                        {submitted && emailError && <span className="text-red-600">Invalid Email</span>}
                    </span>
                    <span className=" flex flex-column  gap-2  col-10 ml-5">
                        <InputText type="password" id="password" name="password" value={result.password} onChange={(e) => onInputChange(e, 'password')} placeholder="password" />
                        {submitted && !result.password && <span className="text-red-600">Password required!</span>}
                        {submitted && passwordError && <span className="text-red-600">Week password. Password should contain capital letters, lowercase letters, numbers and special character!</span>}
                    </span>
                </div>
            </Dialog>
        </>
    );
};

export default create;
