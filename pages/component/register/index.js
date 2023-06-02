import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import React, { useEffect, useState, useRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { pick } from 'lodash';
import { Formik, Form } from 'formik';
import SnipperModal from '../../../styles/SnipperModal';
import * as Yup from 'yup';
import UserService from '../../../services/userService';
import 'react-phone-number-input/style.css';
import Header from '../header';
import Footer from '../footer';
const index = () => {
    const initialValues = {
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmpassword: '',
        roles: [0],
        isSuperAdmin: false
    };
    const [user, setUser] = useState(initialValues);
    const [loading1, setLoading1] = useState(true);
    const [visible, setVisible] = useState(false);
    const [visibleOne, setVisibleOne] = useState(false);
    const [userData, setUserData] = useState();
    const [roleData, setRoleData] = useState();
    const [selectedClient, setSelectedClient] = useState();
    const [manageRD, setManageRD] = useState();
    const [selectedRoles, setSelectedRoles] = useState();
    const [loadingUserRole, setLoadingUserRole] = useState(false);
    const validateSchema = Yup.object().shape({
        visible: Yup.string(),
        firstName: Yup.string().required('*First Name field is required'),
        lastName: Yup.string().required('*Last Name is required'),
        email: Yup.string().email('*Please enter a valid email').required('*Email field is required'),
        phoneNumber: Yup.string().required('*Phone Number field is required'),
        username: Yup.string().required('*User Name  field is required'),

        password: Yup.string().when('visible', {
            is: true,
            then: Yup.string()
                .required('*Password field is required')
                .min(8, '*Pasword must be 8 or more characters')
                .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, '*Password should contain at least one uppercase and lowercase character')
                .matches(/\d/, '*Password should contain at least one number')
                .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, '*Password should contain at least one special character')
        }),

        confirmpassword: Yup.string().when('visible', {
            is: true,
            then: Yup.string().when('password', (password, field) => {
                if (password) {
                    return field.required('*The passwords do not match').oneOf([Yup.ref('password')], '*The passwords do not match');
                }
            })
        })
    });
    const toast = useRef(null);
    const userService = new UserService();
    const getIndex = (arr, value) => {
        let returnValue = -1;
        arr?.map((v, i) => {
            if (value == v?.client) {
                returnValue = i;
            }
        });
        return returnValue;
    };

    useEffect(() => {
        let roleD = [];
        let clientss = [];
        let _role = { name: '', id: 0 };

        userService
            .getroles('')
            .then((res) => {
                // setSelectedClient(res.data);
                res.data?.map((role) => {
                    let clientName = role?.client?.clientName;
                    // let clientId = role?.clientId
                    let index = getIndex(clientss, clientName);
                    if (index === -1) {
                        clientss[clientss.length] = { client: clientName, roles: [] };
                        index = getIndex(clientss, clientName);
                    }
                    _role.id = role?.id;
                    _role.name = role?.name;
                    clientss[index]?.roles?.push(_role);
                    _role = {};
                });

                setSelectedClient(clientss);
            })
            .catch(() => {
                // toast.current.show({
                //     severity: "error",
                //     summary: "Error Message",
                //     detail: "Error while getting roles",
                //     life: 4000
                // });
            });

        userService
            .getClient('Dashboard-View')
            .then((res) => {
                res.data.map((value) => {
                    // RoleArray.push(pick(value,["id","name"]))

                    roleD.push(pick(value, ['id', 'name']));
                });
                setRoleData(roleD);
                setLoading1(false);
            })
            .catch(() => {
                // toast.current.show({
                //     severity: "error",
                //     summary: "Error Message",
                //     detail: "Error while getting client",
                //     life: 4000
                // });
            });
    }, []);
    const addUser = (data) => {
        setLoading1(true);
        let _user = data;

        // const newRoles = [];
        // _user.roles.map((value) => {
        //     newRoles.push(value.id);
        // });

        _user.firstName = _user.firstName.charAt(0).toUpperCase() + _user.firstName.slice(1);
        _user.lastName = _user.lastName.charAt(0).toUpperCase() + _user.lastName.slice(1);

        const newRoles = [];
        _user.roles.map((value) => {
            newRoles.push(value.id);
        });

        userService
            .createUser(_user, 'Dashboard-View')
            .then((res) => {
                toast.current.show({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: 'User Successfully Added',
                    life: 4000
                });
                RefreshTable();
                setLoading1(false);
            })
            .catch((err) => {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: `${err.response.data.errors[0]}`,
                    life: 4000
                });
                setLoading1(false);
            })
            .finally(() => {
                setLoading1(false);
            });

        setVisible(false);
    };
    const RefreshTable = () => {
        userService.getUsers().then((res) => {
            setUserData(res.data);
            setLoading1(false);
        });
    };
    const editUserProfile = (data) => {
        let _user = data;
        _user.roles = selectedRoles;
        _user.firstName = _user.firstName.charAt(0).toUpperCase() + _user.firstName.slice(1);
        _user.lastName = _user.lastName.charAt(0).toUpperCase() + _user.lastName.slice(1);
        updateService(_user);
        setVisibleOne(false);
        setManageRD(false);
        setUser(initialValues);
    };
    const updateService = (data) => {
        userService
            .updateUser(data, 'Users-Edit')
            .then((res) => {
                toast.current.show({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: 'User updated successfully',
                    life: 4000
                });
                RefreshTable();
            })
            .catch((err) => {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: 'Error updating user',
                    life: 4000
                });
            })
            .finally(() => {});
    };
    return (
        <>
            <Header />
            <div className="surface-ground py-3 md:px-8 lg:px-8" style={{ width: '50vw' }}>
                {loadingUserRole ? <SnipperModal /> : <> {null}</>}
                <Toast ref={toast} />
                <Formik
                    initialValues={user}
                    validationSchema={validateSchema}
                    //    onSubmit={(values, { validate }) => {
                    //     validate(values);

                    // }}
                    onSubmit={(values) => {
                        // same shape as initial values
                        if (values.isSecondButton) {
                            addUser(values);
                        }
                    }}
                    //    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {({ handleChange, isSubmitting, handleBlur, handleSubmit, values, errors, isValid, touched, setFieldValue }) => (
                        <Form>
                            <div className="p-fluid  grid card mt-2 ">
                                <span className=" field col-6 flex flex-column gap-2 ">
                                    <label htmlFor="firstName">First Name </label>
                                    <InputText id="firstName" name="firstName" value={values.firstName} onChange={handleChange} placeholder="First Name" className={errors.firstName ? 'error-input' : ''} />

                                    {errors.firstName ? <p className="error-label">{errors.firstName}</p> : null}
                                </span>
                                <span className="field col-6  flex flex-column gap-2">
                                    <label htmlFor="lastName">Last Name </label>
                                    <InputText id="lastName" name="lastName" value={values.lastName} onChange={handleChange} placeholder="Last Name" className={errors.lastName ? 'error-input' : ''} />
                                    {errors.lastName ? <p className="error-label">{errors.lastName}</p> : null}
                                </span>
                                <span className=" flex flex-column  gap-2  col-6">
                                    <label htmlFor="username">UserName </label>
                                    <InputText id="username" name="username" value={values.username} onChange={handleChange} placeholder="username_5" className={errors.username ? 'error-input' : ''} />
                                    {errors.username ? <p className="error-label">{errors.username}</p> : null}
                                </span>
                                <span className=" flex flex-column gap-2  col-6">
                                    <label htmlFor="email">Email </label>
                                    <InputText id="email" value={values.email} name="email" onChange={handleChange} placeholder="JohnDoe@example.com" className={errors.email ? 'error-input' : ''} />
                                    {errors.email ? <p className="error-label">{errors.email}</p> : null}
                                </span>
                                <span className=" flex flex-column  gap-2  col-6">
                                    <label htmlFor="password">Password </label>
                                    <Password id="password" value={values.password} name="password" onChange={handleChange} toggleMask placeholder="************" className={errors.password ? 'error-input' : ''} />
                                    {errors.password ? <p className="error-label">{errors.password}</p> : null}
                                </span>
                                <span className=" flex flex-column gap-2 col-6">
                                    <label htmlFor="confirmPassword">Confirm Password </label>
                                    <Password id="confirmPassword" value={values.confirmpassword} name="confirmpassword" onChange={handleChange} toggleMask placeholder="************" className={errors.confirmpassword ? 'error-input' : ''} />
                                    {errors.confirmpassword ? <p className="error-label">{errors.confirmpassword}</p> : null}
                                </span>
                                <span className=" mt-5 col-12 ">
                                    <PhoneInput
                                        placeholder="Enter phone number"
                                        value={values.phoneNumber}
                                        name="phoneNumber"
                                        onChange={(e) => setFieldValue('phoneNumber', e)}
                                        limitMaxLength={true}
                                        defaultCountry="ET"
                                        international
                                        countryCallingCodeEditable={false}
                                        className={errors.phoneNumber ? 'error-input input-phone-number' : 'input-phone-number'}
                                    />
                                    {errors.phoneNumber ? <p className="error-label">{errors.phoneNumber}</p> : null}
                                </span>
                                <span className="col-12 mt-3 ">
                                    <Button
                                        label="Submit"
                                        autoFocus
                                        type="submit"
                                        className="p-button-info"
                                        onClick={(e) => {
                                            setFieldValue('isSecondButton', true);
                                        }}
                                        raised
                                    />
                                </span>
                            </div>
                        </Form>
                    )}
                </Formik>

                <Dialog header="Edit User" visible={visibleOne} style={{ width: '50vw' }} modal className="p-fluid" onHide={() => setVisibleOne(false)}>
                    <Formik
                        initialValues={user}
                        validationSchema={validateSchema}
                        //    onSubmit={(values, { validate }) => {
                        //     validate(values);

                        // }}
                        onSubmit={(values) => {
                            if (values.isSecondButton) {
                                editUserProfile(values);
                            }
                        }}
                        //    validateOnBlur={false}
                        validateOnChange={false}
                    >
                        {({ handleChange, isSubmitting, handleBlur, handleSubmit, values, errors, isValid, touched, setFieldValue }) => (
                            <Form>
                                <div className="p-fluid  grid card mt-2 ">
                                    <span className=" field col-6 flex flex-column gap-2 ">
                                        <label htmlFor="firstName">First Name </label>
                                        <InputText id="firstName" name="firstName" value={values.firstName} onChange={handleChange} placeholder="First Name" className={errors.firstName ? 'error-input' : ''} />

                                        {errors.firstName ? <p className="error-label">{errors.firstName}</p> : null}
                                    </span>
                                    <span className="field col-6  flex flex-column gap-2">
                                        <label htmlFor="lastName">Last Name </label>
                                        <InputText id="lastName" name="lastName" value={values.lastName} onChange={handleChange} placeholder="Last Name" className={errors.lastName ? 'error-input' : ''} />
                                        {errors.lastName ? <p className="error-label">{errors.lastName}</p> : null}
                                    </span>
                                    <span className=" flex flex-column  gap-2  col-6">
                                        <label htmlFor="username">UserName </label>
                                        <InputText id="username" name="username" value={values.username} onChange={handleChange} placeholder="username_5" className={errors.username ? 'error-input' : ''} />
                                        {errors.username ? <p className="error-label">{errors.username}</p> : null}
                                    </span>
                                    <span className=" flex flex-column gap-2  col-6">
                                        <label htmlFor="email">Email </label>
                                        <InputText id="email" value={values.email} name="email" onChange={handleChange} placeholder="JohnDoe@example.com" className={errors.email ? 'error-input' : ''} />
                                        {errors.email ? <p className="error-label">{errors.email}</p> : null}
                                    </span>

                                    <span className=" mt-5 col-12 ">
                                        <PhoneInput
                                            placeholder="Enter phone number"
                                            value={values.phoneNumber}
                                            name="phoneNumber"
                                            onChange={(e) => setFieldValue('phoneNumber', e)}
                                            limitMaxLength={true}
                                            defaultCountry="ET"
                                            international
                                            countryCallingCodeEditable={false}
                                            className={errors.phoneNumber ? 'error-input input-phone-number' : 'input-phone-number'}
                                        />
                                        {errors.phoneNumber ? <p className="error-label">{errors.phoneNumber}</p> : null}
                                    </span>

                                    <span className="col-12 mt-3">
                                        <Checkbox inputId="superAdmin" name="isSuperAdmin" checked={values.isSuperAdmin} onChange={handleChange} />
                                        <label htmlFor="superAdmin" className="ml-2">
                                            is Super Admin
                                        </label>
                                    </span>
                                    <span className="col-6 mt-3">
                                        <Button label="Cancel" onClick={() => setVisibleOne(false)} className="p-button-outlined warning" raised />
                                    </span>
                                    <span className="col-6 mt-3 ">
                                        <Button
                                            loading={isSubmitting}
                                            label="Update"
                                            autoFocus
                                            className="p-button-info"
                                            raised
                                            onClick={(e) => {
                                                setFieldValue('isSecondButton', true);
                                            }}
                                        />
                                    </span>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Dialog>
            </div>
            <div className="py-7">
                <Footer />
            </div>
        </>
    );
};
index.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};

export default index;
// import React from 'react';
// import Header from '../header';
// import Footer from '../footer';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { useRouter } from 'next/router';
// const index = () => {
//     const router = useRouter();
//     return (
//         <>
//             <div className="col-12">
//                 <div className="card">
//                     <Header />
//                     <div className="px-3 py-5 flex justify-content-center align-items-center">
//                         <div className="border-1 surface-border surface-card border-round px-4 md:px-7 z-1">
//                             <div className="mb-4">
//                                 <div className="text-900 text-xl font-bold mb-2">Register</div>
//                                 <span className="text-600 font-medium">Let&lsquo;s get started</span>
//                             </div>
//                             <div className="flex flex-column">
//                                 <span className="p-input-icon-left w-full mb-4">
//                                     <i className="pi pi-user"></i>
//                                     <InputText id="username" type="text" className="w-full md:w-25rem" placeholder="Username" />
//                                 </span>
//                                 <span className="p-input-icon-left w-full mb-4">
//                                     <i className="pi pi-envelope"></i>
//                                     <InputText id="email" type="text" className="w-full md:w-25rem" placeholder="Email" />
//                                 </span>
//                                 <span className="p-input-icon-left w-full mb-4">
//                                     <i className="pi pi-lock"></i>
//                                     <InputText id="password" type="password" className="w-full md:w-25rem" placeholder="Password" />
//                                 </span>
//                                 <Button label="Sign Up" className="w-full mb-4" onClick={() => router.push('/')}></Button>
//                                 <span className="font-medium text-600">
//                                     Already have an account?{' '}
//                                     <a href="/auth/login" className="font-semibold cursor-pointer text-900 hover:text-primary transition-colors transition-duration-300">
//                                         Login
//                                     </a>
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="py-7">
//                         <Footer />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
