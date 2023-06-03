import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import { MultiSelect } from 'primereact/multiselect';
import React, { useEffect, useState, useRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Checkbox } from 'primereact/checkbox';
import { pick } from 'lodash';
import { Dropdown } from 'primereact/dropdown';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SnipperModal from '../../../styles/SnipperModal';
import * as Yup from 'yup';
import UserService from '../../../services/userService';
import { Accordion, AccordionTab } from 'primereact/accordion';
import 'react-phone-number-input/style.css';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
const Users = () => {
    const initialValues = {
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmpassword: '',
        roles: [],
        isSuperAdmin: false
    };
    const [user, setUser] = useState(initialValues);
    const [loading1, setLoading1] = useState(true);
    const [changeStatusDialog, setChangeStatusDialog] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleOne, setVisibleOne] = useState(false);
    const [userData, setUserData] = useState();
    const [roleData, setRoleData] = useState();
    const [client, setClient] = useState(null);
    const [role, setRole] = useState([]);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedClient, setSelectedClient] = useState();
    const [manageRD, setManageRD] = useState();
    const [selectedRoles, setSelectedRoles] = useState();
    const [loadingUserRole, setLoadingUserRole] = useState(false);
    const [selectedCities, setSelectedCities] = useState(null);
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
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        description: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        recordStatus: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });

    const toast = useRef(null);

    const AddNewBtn = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-user-plus" label="New" className="login-btn" raised onClick={showNewUserDialog} style={{ backgroundColor: '#20a77c' }} />
            </div>
        );
    };
    const userService = new UserService();
    useEffect(() => {
        userService
            .getUsers('Dashboard-View')
            .then((res) => {
                setUserData(res.data);
                setLoading1(false);
                // localStorage.setItem("TotalUser",res.data.length())
            })
            .catch(() => {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: 'Error while fetching Users',
                    life: 4000
                });
            })
            .finally(() => {
                setLoading1(false);
            });
    }, []);

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

    const getSingleUser = (user) => {
        let roless = [];
        userService
            .getSingleUser(user.id, 'Users-View')
            .then((res) => {
                res.data.roles?.map((value) => {
                    if (value.role.recordStatus === 2) {
                        roless.push(value.role);
                    }
                });
            })
            .finally(() => {});
    };

    const showEditUserDialog = (_user) => {
        setUser(_user);
        getRolesForUpdating(_user.id);
        // let roless = [];
        // selectedRoles?.map((value) => {
        //     roless.push(pick(value.role, ['id', 'name']));
        // });

        setVisibleOne(true);
    };
    const showConfirmDeleteDialog = (_user) => {
        setUser(_user);
        setDeleteUserDialog(true);
    };
    const showNewUserDialog = () => {
        setUser(initialValues);
        setVisible(true);
    };
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
    const changeStatus = () => {
        setLoading1(true);
        const successMessage = user.isAccountLocked === false ? 'User Successfully Deactivated.' : 'User Successfully Activated.';
        const errorMessage = user.isAccountLocked === false ? 'Error while deactivating user.' : 'Error while activating user.';
        const status = user.isAccountLocked === true ? 1 : 2;
        const id = user.id;

        if (status) {
            userService
                .activateDeactivateUser({ statusAction: status, userId: id }, 'Users-ChangeStatus')
                .then((res) => {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success Message',
                        detail: successMessage,
                        life: 4000
                    });
                    RefreshTable();
                    setLoading1(false);
                })
                .catch(() => {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error Message',
                        detail: errorMessage,
                        life: 4000
                    });
                    setLoading1(false);
                })
                .finally(() => {
                    setChangeStatusDialog(false);
                    setUser(initialValues);
                    setLoading1(false);
                });
        }
    };
    const hideUserDeleteDialog = () => {
        setDeleteUserDialog(false);
    };
    const RefreshTable = () => {
        userService.getUsers().then((res) => {
            setUserData(res.data);
            setLoading1(false);
        });
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        const _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const showChangeStatusDialog = (_user) => {
        setUser(_user);
        setChangeStatusDialog(true);
    };

    const getRolesForUpdating = (id) => {
        setLoadingUserRole(true);
        userService
            .getSingleUser(id)
            .then((res) => {
                const prevRole = res.data?.roles.map((value) => {
                    return value?.role?.id;
                });
                setSelectedRoles(prevRole);
                setLoadingUserRole(false);
            })
            .finally(() => {
                setLoadingUserRole(false);
            });
    };

    const showRoleUpdateDialog = (_user) => {
        setUser(_user);

        getRolesForUpdating(_user.id);
        setManageRD(true);
    };
    const ActionBody = (rowData) => {
        return (
            <div className="actions flex">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning pl-1 mr-2" onClick={() => showEditUserDialog(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger pl-1 mr-2" onClick={() => showConfirmDeleteDialog(rowData)} />

                {rowData.isAccountLocked === false ? (
                    <Button icon="pi pi-lock" className="p-button-rounded p-button-info pl-1" onClick={() => showChangeStatusDialog(rowData)} />
                ) : (
                    <Button icon="pi pi-lock-open" className="p-button-rounded p-button-info pl-1" onClick={() => showChangeStatusDialog(rowData)} />
                )}
                <Button label="Manage Roles" className="p-button p-button-primary ml-3" onClick={() => showRoleUpdateDialog(rowData)} />
            </div>
        );
    };
    const changeStatusRoleDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-raised" onClick={() => setChangeStatusDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-raised" onClick={changeStatus} />
        </>
    );

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
    const editUserRole = () => {
        user.roles = selectedRoles;
        user.firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
        user.lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
        updateService(user);
        setVisibleOne(false);
        setManageRD(false);
        setUser(initialValues);
        // setPerformingAction(true);
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
    const searchInput = () => {
        return (
            <span className="flex gap-4">
                <span className="flex">
                    <Dropdown
                        value={client}
                        onChange={(e) => {
                            setClient(e.value);
                            SearchClient(e.value);
                        }}
                        options={selectedClient}
                        optionLabel="clientName"
                        placeholder="Filter By Client"
                        filter
                        className="w-full md:w-14rem"
                        optionValue="id"
                    />
                </span>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search user" />
                </span>
            </span>
        );
    };

    const SearchClient = (client) => {
        setLoading1(true);
        userService
            .getUserByClient(client, 'Roles-Add')
            .then((res) => {
                setUserData(res.data);
                setLoading1(false);
            })
            .catch((err) => {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: `${err.response.data.errors[0]}`,
                    life: 4000
                });
                setUserData(null);
            })
            .finally(() => {
                setLoading1(false);
            });
    };
    const deleteUser = () => {
        if (user.id) {
            userService
                .deleteUser(user.id, 'Users-Delete')
                .then((res) => {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success Message',
                        detail: 'User Successfully Deleted',
                        life: 4000
                    });
                    RefreshTable();
                })
                .catch((err) => {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error Message',
                        detail: 'Error deleting user',
                        life: 4000
                    });
                })
                .finally(() => {});
        }

        setDeleteUserDialog(false);
        setUser(initialValues);
    };
    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-raised" onClick={hideUserDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-raised" onClick={deleteUser} />
        </>
    );
    const onRoleChange = (e) => {
        let _roleClaims = [...selectedRoles];

        if (e.checked) _roleClaims.push(e.value);
        else _roleClaims.splice(_roleClaims.indexOf(e.value), 1);

        setSelectedRoles(_roleClaims);
    };

    const recordStatusBody = (rowData) => {
        const status = rowData.isAccountLocked;

        if (!status) {
            return (
                <span
                    style={{
                        backgroundColor: '#C8E6C9',
                        color: '#256029',
                        padding: '0.25em 0.5rem',
                        borderRadius: '2px',
                        fontWeight: 700,
                        fontSize: '12px',
                        letterSpacing: '.3px'
                    }}
                >
                    Active
                </span>
            );
        } else {
            return (
                <span
                    style={{
                        backgroundColor: '#FFCDD2',
                        color: '#C63737',
                        padding: '0.25em 0.5rem',
                        fontWeight: 700,
                        fontSize: '12px',
                        letterSpacing: '.3px'
                    }}
                >
                    Inactive
                </span>
            );
        }
    };
    const userRoleDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-raised"
                onClick={() => {
                    setManageRD(false);
                    setSelectedRoles();
                }}
            />
            <Button label="Yes" icon="pi pi-check" className="p-button-raised" onClick={editUserRole} />
        </>
    );

    return (
        <div className="grid">
            {loadingUserRole ? <SnipperModal /> : <> {null}</>}

            <div className="col-12">
                <Toast ref={toast} />
                <div className="card">
                    <h5>Users</h5>
                    <Toolbar className="mb-4" left={AddNewBtn} right={searchInput} />
                    <DataTable value={userData} paginator rowsPerPageOptions={[5, 10, 25, 50]} rows={8} dataKey="id" filters={filters} filterDisplay="menu" loading={loading1} responsiveLayout="scroll" emptyMessage="No Users found.">
                        <Column field="firstName" header="First Name" dataType="date" style={{ minWidth: '10rem' }} />
                        <Column field="lastName" header="Last Name" filterField="balance" dataType="numeric" style={{ minWidth: '10rem' }} />
                        <Column field="email" header="Email" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} />
                        <Column field="username" header="UserName" showFilterMatchModes={false} style={{ minWidth: '12rem' }} />
                        <Column field="phoneNumber" header="Phone Number" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} />
                        <Column field="isAccountLocked" header="Status" body={recordStatusBody} style={{ minWidth: '12rem' }} />
                        <Column header="Actions" style={{ minWidth: '12rem' }} body={ActionBody} />
                    </DataTable>
                </div>
            </div>

            <Dialog header="New User" visible={visible} style={{ width: '50vw' }} modal className="p-fluid" onHide={() => setVisible(false)}>
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
                                <span className="col-12 mt-3">
                                    <label htmlFor="roles" className="ml-2">
                                        Role
                                    </label>
                                    <MultiSelect
                                        value={values.roles}
                                        name="roles"
                                        options={selectedClient}
                                        onChange={handleChange}
                                        optionLabel="name"
                                        filter
                                        optionGroupLabel="client"
                                        id="roles"
                                        optionGroupChildren="roles"
                                        placeholder="Select role"
                                        display="chip"
                                        optionValue="id"
                                    />
                                </span>

                                <span className="col-12 mt-3">
                                    <Checkbox inputId="superAdmin" name="isSuperAdmin" checked={values.isSuperAdmin} onChange={handleChange} />
                                    <label htmlFor="superAdmin" className="ml-2">
                                        is Super Admin
                                    </label>
                                </span>
                                <span className="col-6 mt-3">
                                    <Button label="Cancel" onClick={() => setVisible(false)} className="p-button-warning" raised />
                                </span>
                                <span className="col-6 mt-3 ">
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
            </Dialog>

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

            <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideUserDeleteDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && (
                        <span>
                            Are you sure you want to delete{' '}
                            <b>
                                {user.firstName} {user.lastName}
                            </b>
                            ?
                        </span>
                    )}
                </div>
            </Dialog>
            <Dialog visible={changeStatusDialog} style={{ width: '450px' }} header="Confirm" modal footer={changeStatusRoleDialogFooter} onHide={() => setChangeStatusDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && (
                        <span>
                            Are you sure you want to{' '}
                            <b>
                                {user.isAccountLocked === false ? 'Deactivate' : 'Activate'} {user.firstName} {user.lastName}
                            </b>
                            ?
                        </span>
                    )}
                </div>
            </Dialog>

            {/* Manage Role Dialog */}
            <Dialog
                visible={manageRD}
                style={{ width: '800px' }}
                header="Manage Role"
                modal
                footer={userRoleDialogFooter}
                onHide={() => {
                    setManageRD(false);
                    setSelectedRoles();
                }}
            >
                <Accordion activeIndex={0}>
                    {selectedClient?.map((clientRoot, index) => (
                        <AccordionTab header={clientRoot?.client}>
                            <div className="p-fluid formgrid grid pt-4">
                                {clientRoot.roles?.map((role) => (
                                    <div className=" field col-4 field-checkbox" key={role?.id}>
                                        <Checkbox inputId={role?.id} value={role?.id} onChange={onRoleChange} checked={selectedRoles?.indexOf(role?.id) !== -1}></Checkbox>
                                        <label htmlFor={role?.id} className="p-checkbox-label">
                                            {role?.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </AccordionTab>
                    ))}
                </Accordion>
            </Dialog>
        </div>
    );
};

export default Users;
