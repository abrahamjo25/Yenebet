import React, { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import RegisterService from '../../../services/registerService';
import { useRouter } from 'next/router';
import Header from '../header';
import Footer from '../footer';
function index() {
    let emptyResult = {
        username: null,
        email: null,
        password: null
    };
    const router = useRouter();

    const toast = useRef(null);
    const [result, setResult] = useState(emptyResult);
    const [waiting, setWaiting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const { ref } = router.query;
    useEffect(() => {}, []);
    const service = new RegisterService();
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
    const addUser = () => {
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
                            .createAccount(result, ref)
                            .then((res) => {
                                if (res) {
                                    if (res.status === 3) {
                                        toast.current.show({ severity: 'success', summary: 'Success', detail: `${res.message}`, life: 4000 });
                                        router.push('/components/profile');
                                    } else {
                                        toast.current.show({ severity: 'error', summary: 'Error', detail: `${res.message || res.data.Message}`, life: 4000 });
                                        router.push('/');
                                    }
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                toast.current.show({ severity: 'error', summary: 'Error', detail: `${err.response.data.message || 'Error occur, Unable to Register.'}`, life: 4000 });
                                router.push('/');
                            })
                            .finally(() => {
                                setWaiting(false);
                                signupHide();
                            });
                    }
                }
            }
        }
    };
    const signupHide = () => {
        router.push('/');
    };

    const signupFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={signupHide} />
            {waiting ? <Button label="Please Wait ..." icon="pi pi-spin pi-spinner"></Button> : <Button label="Register" icon="pi pi-check" className="p-button-raised" onClick={addUser} />}
        </>
    );
    return (
        <>
            <Header />
            <Dialog visible={true} style={{ width: '450px' }} header="Register For YeneBet" footer={signupFooter} onHide={signupHide}>
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
            <Footer />
        </>
    );
}

index.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};

export default index;
