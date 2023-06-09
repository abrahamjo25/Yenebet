import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import RequestService from '../../../services/requestService';
import WithdrawService from '../../../services/withdrawService';
export default function index() {
    let emptyResult = {
        id: null,
        userId: null,
        amount: null,
        bank: null,
        accountNumber: null,
        transactionId: null
    };
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [editableData, setEditableData] = useState(null);
    const [resultDialog, setResultDialog] = useState(false);
    const [resultDeleteDialog, setResultDeleteDialog] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [result, setResult] = useState(emptyResult);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const service_1 = new RequestService();
    const service_2 = new WithdrawService();
    const toast = useRef(null);
    useEffect(() => {
        setLoading(true);
        refreashTable();
    }, []);
    const refreashTable = () => {
        service_2
            .getWithdraws()
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
    const withDraw = (rowData) => {
        setResult(rowData);
        setResultDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setResultDialog(false);
        setResult(emptyResult);
    };
    const hideDeleteResultDialog = () => {
        setResultDeleteDialog(false);
    };
    const saveResult = () => {
        debugger;
        setSubmitted(true);
        if (result.transactionId !== '0') {
            {
                if (result.transactionId !== null) {
                    setLoading(true);
                    service_2
                        .approveWithdraw(result.id, result)
                        .then((res) => {
                            if (res && res.data.status === 3) {
                                toast.current.show({
                                    severity: 'success',
                                    summary: 'Successfull',
                                    detail: `${res.data.message}`,
                                    life: 4000
                                });
                            } else {
                                toast.current.show({
                                    severity: 'error',
                                    summary: 'Unsuccessfull',
                                    detail: `${res.data.message}`,
                                    life: 5000
                                });
                            }
                        })
                        .catch((err) => {
                            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Error occured', life: 4000 });
                        })
                        .finally(() => {
                            setResultDialog(false);
                            refreashTable();
                        });
                }
            }
        } else {
            setError(true);
        }
    };
    const deleteResult = () => {
        debugger;
        let Id = editableData.id;
        service
            .deletePackage(Id, '')
            .then((res) => {
                setLoading(true);
                toast.current.show({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: 'Successfully Deleted',
                    life: 4000
                });
                refreashTable();
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Error occured', life: 4000 });
            })
            .finally(() => {
                setResultDeleteDialog(false);

                // setResult(emptyResult);
            });
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _result = { ...result };
        _result[`${name}`] = val;
        setResult(_result);
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2"></div>
            </React.Fragment>
        );
    };
    const rightToolbarTemplate = () => {
        return <></>;
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-check" label="Approve" disabled={rowData.recordStatus === 3 ? true : false} className="p-button-rounded p-button-warning pl-1 mr-2" onClick={() => withDraw(rowData)} />
            </div>
        );
    };
    const dateBodyTamplate = (rowData) => {
        return <>{new Date(rowData.registeredDate).toLocaleString().split(',')[0]}</>;
    };
    const statusBodyTamplate = (rowData) => {
        let status = 'AA';
        let css = '';
        if (rowData.recordStatus === 3) {
            status = 'Paid';
            css = 'product-badge status-instock';
        } else if (rowData.recordStatus === 2) {
            status = 'Pending';
            css = 'product-badge status-outofstock';
        }
        return (
            <>
                <span className={css}>{status}</span>
            </>
        );
    };
    const resultDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text btn-success" onClick={hideDialog} />
            {waiting ? <Button label="Saving" icon="pi pi-spin pi-spinner" disabled={true} /> : <Button label="Save" icon="pi pi-save" className="btn-danger" onClick={saveResult} />}
        </>
    );
    const deleteResultDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteResultDialog} />
            {waiting ? <Button label="Deleting" icon="pi pi-spin pi-spinner" disabled={true} /> : <Button label="Yes" icon="pi pi-check" className="" onClick={deleteResult} />}
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
                emptyMessage="No Packages found ."
                currentPageReportTemplate="Showing {first} - {last} of {totalRecords} Packages"
                header="All Payments"
            >
                <Column field="userId" header="User Id" />
                <Column field="amount" header="Ammount to Withdraw" />
                <Column field="bank" header="Bank to Withdraw" />
                <Column field="accountNumber" header="Account Number" />
                <Column field="transactionId" header="Transaction Id" />
                <Column field="registeredDate" header="Request Date(M/D/Y)" body={dateBodyTamplate} />
                <Column field="recordStatus" header="Status" body={statusBodyTamplate} />
                <Column header="Action" body={actionBodyTemplate} />
            </DataTable>
            <Dialog visible={resultDialog} style={{ width: '700px' }} header="" modal className="p-fluid" footer={resultDialogFooter} onHide={hideDialog}>
                <div className="card p-fluid">
                    <h4 className="text-center">Approve Withdrawal Money</h4>
                    <span className="text-red-600 mb-3">This is the final stage. the system authomatically withdraw from the account given after you give the transaction Id.</span>
                    <div className="formgrid grid">
                        <div className="field col-6">
                            <label htmlFor="transactionId">Transaction Id</label>
                            <InputText
                                id="transactionId"
                                // value={result.transactionId}
                                onChange={(e) => onInputChange(e, 'transactionId')}
                                placeholder="Transaction Id"
                                required
                                className={classNames({ 'p-invalid': submitted && !result.transactionId })}
                            />
                            {submitted && error && <small className="p-invalid text-red-600">Transaction Id is required.</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="userId">User Id</label>
                            <InputText id="userId" value={result.userId} disabled={true} onChange={(e) => onInputChange(e, 'userId')} required className={classNames({ 'p-invalid': submitted && !result.userId })} />
                            {submitted && !result.userId && <small className="p-invalid text-danger">User Id is required.</small>}
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="bank">Bank</label>
                            <InputText id="bank" value={result.bank} disabled={true} onChange={(e) => onInputChange(e, 'bank')} required className={classNames({ 'p-invalid': submitted && !result.bank })} />
                            {submitted && !result.bank && <small className="p-invalid text-danger">Bank is required.</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="accountNumber">Account Number</label>
                            <InputText
                                id="accountNumber"
                                type="number"
                                value={result.accountNumber}
                                disabled={true}
                                onChange={(e) => onInputChange(e, 'accountNumber')}
                                required
                                className={classNames({ 'p-invalid': submitted && !result.accountNumber })}
                            />
                            {submitted && !result.accountNumber && <small className="p-invalid text-danger">Account is required.</small>}
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="amount">Ammount</label>
                            <InputText id="amount" value={result.amount} onChange={(e) => onInputChange(e, 'amount')} disabled={true} required className={classNames({ 'p-invalid': submitted && !result.amount })} />
                            {submitted && !result.amount && <small className="p-invalid text-danger">Ammount is required.</small>}
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
