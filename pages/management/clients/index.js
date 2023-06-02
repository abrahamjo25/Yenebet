import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { SplitButton } from 'primereact/splitbutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Password } from 'primereact/password';
import UserService from '../../../services/userService';
import { Dropdown } from 'primereact/dropdown';
import { useRouter } from 'next/router';
import { useClientStore } from '../../../utilities/store';

export default function Clients() {
    const router = new useRouter();

    let emptyClientModel = {
        clientName: '',
        clientId: '',
        clientSecret: '',
        description: '',
        accessTokenLifeTime: 3600,
        refreshTokenLifeTime: 3600,
        apiClaims: []
    };

    const [setClientStore] = useClientStore((state) => [state.update]);

    const [client, setClient] = useState(emptyClientModel);
    const [clients, setClients] = useState([]);
    const [clientClaims, setClientClaims] = useState([]);
    const [selectedClients, setSelectedClients] = useState([]);

    const [clientDialog, setClientDialog] = useState(false);
    const [newClientDialog, setNewClientDialog] = useState(false);
    const [changeStatusDialog, setChangeStatusDialog] = useState(false);
    const [deleteClientDialog, setDeleteClientDialog] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loadingClients, setLoadingClients] = useState(true);
    const [selectAll, setSelectAll] = useState(false);
    const [performingAction, setPerformingAction] = useState(false);

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        description: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        recordStatus: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: { ...emptyClientModel }
    });

    const toast = useRef(null);

    const clientService = new UserService();

    useEffect(() => {
        clientService
            .getClient()
            .then((res) => {
                setClients(res.data);
                setLoading(false);
            })
            .catch(() => {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Error while fetching Clients', life: 4000 });
            })
            .finally(() => {
                setLoading(false);
            });
        clientService
            .getApiClaim('')
            .then((res) => {
                const clients = res.data.sort((a, b) => a.claim.localeCompare(b.claim));
                setClientClaims(clients);
            })
            .catch((e) => {
                setClientClaims([]);
            });
    }, [loading]);

    const onClientChange = (e) => {
        let _clientClaims = [...selectedClients];

        if (e.checked) _clientClaims.push(e.value);
        else _clientClaims.splice(_clientClaims.indexOf(e.value), 1);

        setSelectedClients(_clientClaims);
    };

    const checkAllSelection = () => {
        if (clientClaims.length === selectedClients.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    };

    useEffect(() => {
        checkAllSelection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedClients, newClientDialog]);

    const onSelectAllChange = (e) => {
        if (e.checked) {
            let _clientClaims = [];
            for (let i = 0; i < clientClaims.length; i++) {
                _clientClaims.push(clientClaims[i].id);
            }

            setSelectedClients(_clientClaims);
        } else setSelectedClients([]);

        setSelectAll(e.checked);
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        const _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const RefreshTable = (e) => {
        clientService
            .getClient()
            .then((res) => {
                setClients(res.data);
                setLoading(false);
            })
            .catch(() => {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Error while fetching Clients', life: 4000 });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const showNewClientDialog = () => {
        setClient(emptyClientModel);
        reset(emptyClientModel);

        setLoadingClients(false);
        setNewClientDialog(true);
        setClientDialog(true);
    };

    const getClaimsForUpdating = (id) => {
        clientService
            .getSingleClient(id, 'Client-View')
            .then((res) => {
                const prevClient = res.data?.clientApiResourses.map((value) => {
                    return value.apiClaim.id;
                });
                setSelectedClients(prevClient);
            })
            .finally(() => {
                setLoadingClients(false);
            });
    };

    const showEditClientDialog = (_client) => {
        setClient(_client);
        reset(_client);

        getClaimsForUpdating(_client.id);

        setNewClientDialog(false);
        setClientDialog(true);
    };

    const showConfirmDeleteDialog = (_client) => {
        setClient(_client);
        setDeleteClientDialog(true);
    };

    const showChangeStatusDialog = (_client) => {
        setClient(_client);
        setChangeStatusDialog(true);
    };

    const hideClientDialog = () => {
        setSelectedClients([]);
        setPerformingAction(false);
        setClientDialog(false);
        setLoadingClients(true);
    };

    const hideClientDeleteDialog = () => {
        setDeleteClientDialog(false);
    };

    const addClient = (data) => {
        debugger;
        let requestBody = data;

        // requestBody.clientId = 1
        requestBody.apiClaims = selectedClients;

        setPerformingAction(true);
        console.log('Request', requestBody);
        clientService
            .createClient(requestBody)
            .then((res) => {
                setLoading(true);
                RefreshTable();
                toast.current.show({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: 'Successfully added a new Client',
                    life: 4000
                });
            })
            .catch((err) => {
                console.log(err);
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: `${err.response?.data.errors[0]}`, life: 4000 });
            })
            .finally(() => {
                setSelectedClients([]);
                setClientDialog(false);
                setClient(emptyClientModel);
                setPerformingAction(false);
                hideClientDialog();
                10;
            });
    };

    const editClient = (data) => {
        let _client = data;

        const index = _client.id;

        _client.clientApiResourses = selectedClients;
        _client['apiClaim'] = _client.clientApiResourses;
        delete _client.clientApiResourses;

        setPerformingAction(true);

        clientService
            .updateClient(_client, index, 'Client-Edit')
            .then((res) => {
                toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Client updated successfully', life: 4000 });
                setLoading(true);
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: `${err.response?.data.errors[0]}`, life: 4000 });
            })
            .finally(() => {
                setSelectedClients([]);
                setClientDialog(false);
                setClient(emptyClientModel);
                setPerformingAction(false);
                hideClientDialog();
            });
    };

    const deleteClient = () => {
        setPerformingAction(true);

        if (client.id) {
            clientService
                .deleteClient(client.id, 'Client-Delete')
                .then((res) => {
                    toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Client Successfully Deleted', life: 4000 });
                    setLoading(true);
                })
                .catch((err) => {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error Message',
                        detail: `${err.response?.data.errors[0]}`,
                        life: 4000
                    });
                })
                .finally(() => {
                    setDeleteClientDialog(false);
                    setClient(emptyClientModel);
                    setPerformingAction(false);
                });
        }
    };

    const changeStatus = () => {
        setPerformingAction(true);

        const successMessage = client.recordStatus !== 1 ? 'Client Successfully Inactivated.' : 'client Successfully Activated.';
        const recordStatus = client.recordStatus === 1 ? 2 : 1;
        const id = client.clientId;

        if (recordStatus) {
            clientService
                .activateDeactivateClient({ status: recordStatus, clientId: id }, '', 'Clients-ChangeStatus')
                .then((res) => {
                    toast.current.show({ severity: 'success', summary: 'Success Message', detail: successMessage, life: 4000 });
                    setLoading(true);
                })
                .catch(() => {
                    toast.current.show({ severity: 'error', summary: 'Error Message', detail: `${err.response?.data.errors[0]}`, life: 4000 });
                })
                .finally(() => {
                    setChangeStatusDialog(false);
                    setClient(emptyClientModel);
                    setPerformingAction(false);
                });
        }
    };

    const addNewClientBtn = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button icon="pi pi-plus" label="New" className="login-btn" onClick={showNewClientDialog} style={{ backgroundColor: '#20a77c' }} />
                </div>
            </React.Fragment>
        );
    };

    const searchInput = () => {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search ..." />
            </span>
        );
    };

    const headerRender = () => {
        return (
            <div className="md:flex justify-content-between align-items-center">
                <h5 className="m-0">Manage Clients</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search Client" />
                </span>
            </div>
        );
    };

    const items = (data) => [
        {
            label: 'Manage Roles',
            icon: 'pi pi-ticket',
            command: () => {
                setClientStore({
                    id: data?.id,
                    clientId: data?.clientId,
                    clientName: data?.clientName
                });
                router.push('/management/clients/roles');
            }
        },
        {
            label: 'Manage API Resources',
            icon: 'pi pi-key',
            command: () => {
                setClientStore({
                    id: data?.id,
                    clientId: data?.clientId,
                    clientName: data?.clientName
                });
                router.push('/management/clients/resources');
            }
        }
    ];

    const save = (data) => {
        setClientStore({
            id: data?.id,
            clientId: data?.clientId,
            clientName: data?.clientName
        });
        router.push('/management/clients/claims');
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning pl-1 mr-2" onClick={() => showEditClientDialog(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger pl-1 mr-2" onClick={() => showConfirmDeleteDialog(rowData)} />

                {rowData.recordStatus !== 1 ? (
                    <Button icon="pi pi-lock" className="p-button-rounded p-button-info pl-1" onClick={() => showChangeStatusDialog(rowData)} />
                ) : (
                    <Button icon="pi pi-lock-open" className="p-button-rounded p-button-info pl-1" onClick={() => showChangeStatusDialog(rowData)} />
                )}

                <SplitButton label="Manage Claims" icon="pi pi-wrench" onClick={() => save(rowData)} model={items(rowData)} severity="secondary" className="ml-2" size="small" />
            </div>
        );
    };

    const statuses = [
        { name: 'Active', value: '2' },
        { name: 'Inactive', value: '1' }
    ];

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} optionLabel={'name'} onChange={(e) => options.filterCallback(e.value, options.index)} placeholder="Select a Status" className="p-column-filter" showClear />;
    };

    const recordStatusBody = (rowData) => {
        const status = rowData.recordStatus;

        if (status === 1) {
            return <span style={{ backgroundColor: '#FFCDD2', color: '#C63737', padding: '0.25em 0.5rem', fontWeight: 700, fontSize: '12px', letterSpacing: '.3px' }}>Inactive</span>;
        } else {
            return <span style={{ backgroundColor: '#C8E6C9', color: '#256029', padding: '0.25em 0.5rem', borderRadius: '2px', fontWeight: 700, fontSize: '12px', letterSpacing: '.3px' }}>Active</span>;
        }
    };

    const clientDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-raised" onClick={hideClientDialog} />
            {performingAction ? (
                <Button label="Submit" icon="pi pi-spin pi-spinner"></Button>
            ) : (
                <Button label="Submit" icon="pi pi-check" className="p-button-raised" disabled={loadingClients} onClick={newClientDialog ? handleSubmit(addClient) : handleSubmit(editClient)} />
            )}
        </>
    );

    const deleteClientDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-raised" onClick={hideClientDeleteDialog} />
            {performingAction ? <Button label="Submit" icon="pi pi-spin pi-spinner"></Button> : <Button label="Yes" icon="pi pi-check" className="p-button-raised" onClick={deleteClient} />}
        </>
    );

    const changeStatusClientDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-raised" onClick={() => setChangeStatusDialog(false)} />
            {performingAction ? <Button label="Submit" icon="pi pi-spin pi-spinner"></Button> : <Button label="Yes" icon="pi pi-check" className="p-button-raised" onClick={changeStatus} />}
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={addNewClientBtn} right={searchInput} />
            <DataTable
                value={clients}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 15]}
                dataKey="id"
                rowHover
                filters={filters}
                filterDisplay="menu"
                loading={loading}
                responsiveLayout="scroll"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                emptyMessage="No Clients Found!."
                currentPageReportTemplate="Showing {first} - {last} of {totalRecords} Clients"
            >
                <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                <Column field="clientId" header="Client ID" sortable style={{ minWidth: '12rem' }} headerStyle={{ minWidth: '12rem' }}></Column>
                <Column field="clientName" header="Client Name" sortable style={{ minWidth: '20rem' }} headerStyle={{ minWidth: '20rem' }}></Column>
                <Column field="description" header="Description" sortable style={{ minWidth: '20rem' }} headerStyle={{ minWidth: '20rem' }}></Column>
                <Column field="recordStatus" header="Status" body={recordStatusBody} sortable style={{ minWidth: '5rem' }} filter filterElement={statusFilterTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                <Column body={actionBodyTemplate} header="Action" style={{ minWidth: '30rem' }} headerStyle={{ minWidth: '30rem' }}></Column>
            </DataTable>

            <Dialog visible={deleteClientDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteClientDialogFooter} onHide={hideClientDeleteDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {client && (
                        <span>
                            Are you sure you want to delete <b>{client.clientName}</b> Client?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={changeStatusDialog} style={{ width: '450px' }} header="Confirm" modal footer={changeStatusClientDialogFooter} onHide={() => setChangeStatusDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {client && (
                        <span>
                            Are you sure you want to{' '}
                            <b>
                                {client.recordStatus === 1 ? 'Activate' : 'Deactivate'} {client.clientName}
                            </b>{' '}
                            Clients?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={clientDialog} style={{ width: '70vw', height: '80vh' }} header={newClientDialog ? 'New Client' : 'Update Client'} modal className="p-fluid" footer={clientDialogFooter} onHide={hideClientDialog}>
                <div className="field">
                    <label htmlFor="name">Name *</label>
                    <Controller name="clientName" control={control} rules={{ required: true }} render={({ field }) => <InputText keyfilter={/^[a-zA-Z\s]*$/} id="name" value={field.value} onChange={field.onChange} required autoFocus {...field} />} />
                    {errors.clientName?.type === 'required' && <small className="p-error">Client Name is rquired</small>}
                </div>

                <div className="field">
                    <label htmlFor="clientId">Client ID *</label>
                    <Controller name="clientId" control={control} rules={{ required: true }} render={({ field }) => <InputText keyfilter={/^[a-zA-Z\s]*$/} id="clientId" value={field.value} onChange={field.onChange} required {...field} />} />
                    {errors.clientId?.type === 'required' && <small className="p-error">Client ID is required </small>}
                </div>

                {newClientDialog ? (
                    <div className="field">
                        <label htmlFor="clientSecret">Client Secret *</label>

                        <Controller name="clientSecret" control={control} rules={{ required: false }} render={({ field }) => <Password value={field.value} onChange={field.handleChange} toggleMask placeholder="************" {...field} />} />
                        {errors.clientSecret?.type === 'required' && <small className="p-error">Client Secret is Required.</small>}
                    </div>
                ) : (
                    <></>
                )}

                <div className="field">
                    <label htmlFor="accessTokenLifeTime">Access Token Life Time </label>
                    <Controller
                        name="accessTokenLifeTime"
                        control={control}
                        rules={{ required: true, min: 3600 }}
                        render={({ field }) => <InputNumber inputId="accessTokenLifeTime" suffix=" min" value={field.value} onValueChange={field.onChange} />}
                    />
                    {errors.accessTokenLifeTime?.type === 'min' && <small className="p-error">Access token life time should be minimum 3600 </small>}
                </div>

                <div className="field">
                    <label htmlFor="refreshTokenLifeTime">Refresh Token Life Time </label>
                    <Controller
                        name="refreshTokenLifeTime"
                        control={control}
                        rules={{ required: true, min: 3600 }}
                        render={({ field }) => <InputNumber inputId="refreshTokenLifeTime" suffix=" min" value={field.value} onValueChange={field.onChange} />}
                    />
                    {errors.refreshTokenLifeTime?.type === 'min' && <small className="p-error">Refresh token life time should be minimum 3600 </small>}
                </div>

                <div className="field">
                    <label htmlFor="Description">Description *</label>
                    <Controller name="description" control={control} rules={{ required: true }} render={({ field }) => <InputTextarea {...field} rows={5} cols={30} id="description" value={field.value} onChange={field.onChange} required />} />
                    {errors.description?.type === 'required' && <small className="p-error">Claim description is required.</small>}
                </div>
            </Dialog>
        </div>
    );
}
