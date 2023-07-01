import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import RecordService from '../../../services/recordService';
import { Dialog } from 'primereact/dialog';
export default function index() {
    const [loading, setLoading] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [result, setResult] = useState(null);
    const [results, setResults] = useState(null);
    const [checked, setChecked] = useState(false);
    const [resultDialog, setResultDialog] = useState(false);
    const [revertDialog, setRevertDialog] = useState(false);
    const service = new RecordService();
    const toast = useRef(null);
    useEffect(() => {
        setLoading(true);
        service
            .getRecord()
            .then((res) => {
                setResults(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    const addNew = () => {
        return (
            <React.Fragment>
                <div className="my-2"></div>
            </React.Fragment>
        );
    };
    const openDialog = (rowData) => {
        setResult(rowData);
        setResultDialog(true);
    };
    const openRevertDialog = (rowData) => {
        setResult(rowData);
        setRevertDialog(true);
    };
    const hideDialog = () => {
        setChecked(false);
        setResultDialog(false);
    };
    const hideRevertDialog = () => {
        setChecked(false);
        setRevertDialog(false);
    };

    const searchInput = () => {
        return (
            <span className="flex gap-4">
                <span className="p-input-icon-left flex"></span>
            </span>
        );
    };
    const saveResult = () => {
        let id = result?.id || 0;
        let user = result?.userId || '';
        let transactionId = result?.transactionId || '';
        setWaiting(true);
        service
            .approveRecord(id, user, transactionId)
            .then((res) => {
                if (res.data.status === 3) {
                    toast.current.show({ severity: 'success', summary: 'Successull', detail: 'Payment Approved', life: 4000 });
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: `${res.data.message}`, life: 4000 });
                }
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: `Error Occured`, life: 4000 });
            })
            .finally(() => {
                setWaiting(false);
                hideDialog();
            });
    };
    const updateResult = () => {
        let id = result?.id || 0;
        let user = result?.userId || '';
        let transactionId = result?.transactionId || '';
        setWaiting(true);
        service
            .revertRecord(id, user, transactionId)
            .then((res) => {
                if (res.data.status === 3) {
                    toast.current.show({ severity: 'success', summary: 'Successull', detail: 'Payment Reverted back to un payed', life: 4000 });
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: `${res.data.message}`, life: 4000 });
                }
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: `Error Occured`, life: 4000 });
            })
            .finally(() => {
                setWaiting(false);
                hideDialog();
            });
    };
    const payedBodyStatus = (rowData) => {
        let text = '';
        let style = '';
        if (rowData.isPayed === true) {
            text = 'Checked';
            style = 'customer-badge status-qualified';
        } else {
            text = 'Not Checked';
            style = 'customer-badge status-unqualified';
        }
        return <span className={style}>{text}</span>;
    };
    const resultDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text btn-success" onClick={hideDialog} />
            {waiting ? <Button label="Saving" icon="pi pi-spin pi-spinner" disabled={true} /> : <Button label="Save" icon="pi pi-save" disabled={!checked} className="btn-danger" onClick={saveResult} />}
        </>
    );
    const revertDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text btn-success" onClick={hideRevertDialog} />
            {waiting ? <Button label="Saving" icon="pi pi-spin pi-spinner" disabled={true} /> : <Button label="Save" icon="pi pi-save" disabled={!checked} className="btn-danger" onClick={updateResult} />}
        </>
    );
    const actionBodyTemplate = (rowData) => {
        if (rowData.isPayed === true) {
            return (
                <div className="actions">
                    <Button icon="pi pi-check" label="Revert" className="p-button-rounded p-button-info pl-1 mr-2" onClick={() => openRevertDialog(rowData)} />
                </div>
            );
        } else {
            return (
                <div className="actions">
                    <Button icon="pi pi-check" label="Check as Payed" className="p-button-rounded p-button-warning pl-1 mr-2" onClick={() => openDialog(rowData)} />
                </div>
            );
        }
    };
    const rowCount = (rowData, props) => {
        let index = parseInt(props.rowIndex + 1, 10);
        return (
            <React.Fragment>
                <span>{index}</span>
            </React.Fragment>
        );
    };
    return (
        <>
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={addNew} right={searchInput} />
            <DataTable
                value={results}
                paginator
                rows={8}
                rowsPerPageOptions={[8, 15, 25]}
                dataKey="id"
                rowHover
                filterDisplay="menu"
                loading={loading}
                responsiveLayout="scroll"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                emptyMessage="No Records found ."
                currentPageReportTemplate="Showing {first} - {last} of {totalRecords} Records"
            >
                <Column field="" header="No" body={rowCount} />
                <Column field="userId" header="User Id" />
                <Column field="bank" header="Paid in" />
                <Column field="transactionId" header="Transaction Id" />
                <Column field="noTodayTask" header="Today Task Count" />
                <Column field="packages.packageAmount" header="Package Ammount" />
                <Column field="balance" header="Balance" />
                <Column field="isPayed" header="Payed Status" body={payedBodyStatus} />
                <Column header="Action" body={actionBodyTemplate} />
            </DataTable>
            <Dialog visible={resultDialog} style={{ width: '450px' }} header="" modal className="p-fluid" footer={resultDialogFooter} onHide={hideDialog}>
                <h4 className="text-red-600 text-center">Warining!</h4>
                <p className="text-center">
                    Are you sure! you must check the transaction Id is correct with TransactionID <u>{result?.transactionId}</u>
                </p>
                <Checkbox id="checkbox" onChange={(e) => setChecked(!checked)} checked={checked}></Checkbox>
                <label htmlFor="checkbox"> Confirm here </label>
            </Dialog>
            <Dialog visible={revertDialog} style={{ width: '450px' }} header="" modal className="p-fluid" footer={revertDialogFooter} onHide={hideRevertDialog}>
                <h4 className="text-red-600 text-center">Warining!</h4>
                <p className="text-center">
                    Are you sure! you are reverting back to un payed with TransactionID <u>{result?.transactionId}</u>
                </p>
                <Checkbox id="checkbox" onChange={(e) => setChecked(!checked)} checked={checked}></Checkbox>
                <label htmlFor="checkbox"> Confirm here </label>
            </Dialog>
        </>
    );
}
