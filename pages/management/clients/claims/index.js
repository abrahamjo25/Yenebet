import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

import UserService from '../../../../services/userService';
import { useClientStore } from '../../../../utilities/store';

export default function ManageCliams() {
    const [clientStore] = useClientStore((state) => [state.id]);

    const [clientData, setClientData] = useState(null);

    useEffect(() => {
        setClientData(clientStore);
    }, []);

    let emptyClaimModel = {
        name: '',
        claim: '',
        description: '',
        clientId: 0
    };

    const [claim, setClaim] = useState(emptyClaimModel);
    const [claims, setClaims] = useState([]);

    const [claimDialog, setClaimDialog] = useState(false);
    const [newClaimDialog, setNewClaimDialog] = useState(false);
    const [changeStatusDialog, setChangeStatusDialog] = useState(false);
    const [deleteClaimDialog, setDeleteClaimDialog] = useState(false);

    const [loading, setLoading] = useState(true);
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
        defaultValues: { ...emptyClaimModel }
    });

    const toast = useRef(null);

    const userService = new UserService();

    const fetchClientClaims = () => {
        setLoading(true);

        userService
            .getClientClaimByClientId(clientStore?.id)
            .then((res) => {
                setClaims(res.data);
            })
            .catch(() => {
                setClaims([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchClientClaims();
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        const _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const showNewClaimDialog = () => {
        reset(emptyClaimModel);
        setNewClaimDialog(true);
        setClaimDialog(true);
    };

    const showEditClaimDialog = (_claim) => {
        setNewClaimDialog(false);
        setClaimDialog(true);

        console.log(_claim);

        setClaim(_claim);
        reset(_claim);
    };

    const showConfirmDeleteDialog = (_claim) => {
        setClaim(_claim);
        setDeleteClaimDialog(true);
    };

    const showChangeStatusDialog = (_claim) => {
        setClaim(_claim);
        setChangeStatusDialog(true);
    };

    const hideClaimDialog = () => {
        setPerformingAction(false);
        setClaimDialog(false);
    };

    const hideClaimDeleteDialog = () => {
        setDeleteClaimDialog(false);
    };

    const addClientClaim = (data) => {
        setPerformingAction(true);

        let _claim = data;
        _claim.clientId = clientData?.id;

        userService
            .createClientCliam(_claim, 'ClientClaims-Add')
            .then((res) => {
                fetchClientClaims();
                toast.current.show({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: 'Successfully added a new Client Claim',
                    life: 4000
                });
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: `${err.response.data.errors[0]}`, life: 4000 });
            })
            .finally(() => {
                setClaimDialog(false);
                setClaim(emptyClaimModel);
                setPerformingAction(false);
                hideClaimDialog();
            });
    };

    const editClientClaim = (data) => {
        let _claim = data;

        const index = _claim.id;
        _claim.clientId = clientData?.id;

        setPerformingAction(true);

        userService
            .updateClientClaim(_claim, index, 'ClientClaim-Edit')
            .then((res) => {
                toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Client Claim updated successfully', life: 4000 });
                fetchClientClaims();
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: `${err.response.data.errors[0]}`, life: 4000 });
            })
            .finally(() => {
                setClaimDialog(false);
                setClaim(emptyClaimModel);
                setPerformingAction(false);
                hideClaimDialog();
            });
    };

    const deleteClaim = () => {
        setPerformingAction(true);

        if (claim?.id) {
            userService
                .deleteClientClaim(claim?.id, 'ClientClaim-Delete')
                .then((res) => {
                    toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Client Claim Successfully Deleted', life: 4000 });
                    fetchClientClaims();
                })
                .catch((err) => {
                    toast.current.show({ severity: 'error', summary: 'Error Message', detail: `${err.response.data.errors[0]}`, life: 4000 });
                })
                .finally(() => {
                    setDeleteClaimDialog(false);
                    setClaim(emptyClaimModel);
                    setPerformingAction(false);
                });
        }
    };

    const changeStatus = () => {
        setPerformingAction(true);

        const successMessage = claim?.recordStatus !== 1 ? 'Client Claim Successfully Deactivated.' : 'Client Claim Successfully Activated.';
        const status = claim?.recordStatus === 1 ? 2 : 1;
        const id = claim?.id;

        if (status) {
            userService
                .activateDeactivateClientClaim({ recordStatus: status, id }, '', 'ClientClaim-ChangeStatus')
                .then((res) => {
                    toast.current.show({ severity: 'success', summary: 'Success Message', detail: successMessage, life: 4000 });
                    fetchClientClaims();
                })
                .catch(() => {
                    toast.current.show({ severity: 'error', summary: 'Error Message', detail: `${err.response.data.errors[0]}`, life: 4000 });
                })
                .finally(() => {
                    setChangeStatusDialog(false);
                    setClaim(emptyClaimModel);
                    setPerformingAction(false);
                });
        }
    };

    const addNewClaimBtn = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button icon="pi pi-plus" label="New" className="login-btn" onClick={showNewClaimDialog} style={{ backgroundColor: '#20a77c' }} />
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

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning pl-1 mr-2" onClick={() => showEditClaimDialog(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger pl-1 mr-2" onClick={() => showConfirmDeleteDialog(rowData)} />

                {rowData.recordStatus !== 1 ? (
                    <Button icon="pi pi-lock" className="p-button-rounded p-button-info pl-1" onClick={() => showChangeStatusDialog(rowData)} />
                ) : (
                    <Button icon="pi pi-lock-open" className="p-button-rounded p-button-info pl-1" onClick={() => showChangeStatusDialog(rowData)} />
                )}
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

    const claimDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-raised" onClick={hideClaimDialog} />
            {performingAction ? (
                <Button label="Submit" icon="pi pi-spin pi-spinner"></Button>
            ) : (
                <Button label="Submit" icon="pi pi-check" className="p-button-raised" onClick={newClaimDialog ? handleSubmit(addClientClaim) : handleSubmit(editClientClaim)} />
            )}
        </>
    );

    const deleteClaimDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-raised" onClick={hideClaimDeleteDialog} />
            {performingAction ? <Button label="Submit" icon="pi pi-spin pi-spinner"></Button> : <Button label="Yes" icon="pi pi-check" className="p-button-raised" onClick={deleteClaim} />}
        </>
    );

    const changeStatusClaimDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-raised" onClick={() => setChangeStatusDialog(false)} />
            {performingAction ? <Button label="Submit" icon="pi pi-spin pi-spinner"></Button> : <Button label="Yes" icon="pi pi-check" className="p-button-raised" onClick={changeStatus} />}
        </>
    );

    return (
        <div className="card">
            <div className="card">
                <h4>[ {clientData?.clientName} ] Client Claims</h4>
            </div>
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={addNewClaimBtn} right={searchInput} />
            <DataTable
                value={claims}
                paginator
                rows={8}
                rowsPerPageOptions={[5, 10, 15]}
                dataKey="id"
                rowHover
                filters={filters}
                filterDisplay="menu"
                loading={loading}
                responsiveLayout="scroll"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                emptyMessage="No Client Claim found ."
                currentPageReportTemplate="Showing {first} - {last} of {totalRecords} Client Claim"
            >
                <Column field="claim" header="Claim" sortable style={{ minWidth: '12rem' }} headerStyle={{ minWidth: '12rem' }}></Column>
                <Column field="name" header=" Name" filter sortable style={{ minWidth: '12rem' }} headerStyle={{ minWidth: '12rem' }}></Column>
                <Column field="description" header="Description" sortable style={{ minWidth: '20rem' }} headerStyle={{ minWidth: '20rem' }}></Column>
                <Column field="recordStatus" header="Status" body={recordStatusBody} sortable style={{ minWidth: '5rem' }} filter filterElement={statusFilterTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                <Column body={actionBodyTemplate} header="Action" style={{ minWidth: '12rem' }} headerStyle={{ minWidth: '12rem' }}></Column>
            </DataTable>

            <Dialog visible={deleteClaimDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteClaimDialogFooter} onHide={hideClaimDeleteDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {claim && (
                        <span>
                            Are you sure you want to delete <b>{claim?.name}</b> Client Claim ?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={changeStatusDialog} style={{ width: '450px' }} header="Confirm" modal footer={changeStatusClaimDialogFooter} onHide={() => setChangeStatusDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {claim && (
                        <span>
                            Are you sure you want to{' '}
                            <b>
                                {claim?.recordStatus === 1 ? 'Activate' : 'Deactivate'} {claim?.name}
                            </b>{' '}
                            Client Claim?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={claimDialog} style={{ width: '40vw', height: '65vh' }} header={newClaimDialog ? 'New Client Claim' : 'Update Client Claim'} modal className="p-fluid" footer={claimDialogFooter} onHide={hideClaimDialog}>
                <div className="field">
                    <label htmlFor="claim">Cliam *</label>
                    <Controller name="claim" control={control} rules={{ required: true }} render={({ field }) => <InputText keyfilter={/^[a-zA-Z\s\-]*$/} id="claim" value={field.value} onChange={field.onChange} autoFocus />} />
                    {errors.claim?.type === 'required' && <small className="p-error">Claim is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="name"> Claim Name *</label>
                    <Controller name="name" control={control} rules={{ required: true }} render={({ field }) => <InputText keyfilter={/^[a-zA-Z\s\-]*$/} id="name" value={field.value} onChange={field.onChange} />} />
                    {errors.name?.type === 'required' && <small className="p-error">Claim name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description">Description *</label>
                    <Controller name="description" control={control} rules={{ required: true }} render={({ field }) => <InputTextarea rows={5} cols={30} id="description" value={field.value} onChange={field.onChange} />} />
                    {errors.description?.type === 'required' && <small className="p-error">Claim description is required.</small>}
                </div>
            </Dialog>
        </div>
    );
}
