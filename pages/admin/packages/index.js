import React, { useEffect, useRef, useState } from 'react';
import PackageService from '../../../services/PackageService';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Ripple } from 'primereact/ripple';
import { update } from 'lodash';
export default function index() {
    let emptyResult = {
        packageName: '',
        description: '',
        packageAmount: 0,
        noTask: 0,
        taskValue: 0
    };
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [editableData, setEditableData] = useState(null);
    const [resultDialog, setResultDialog] = useState(false);
    const [resultDeleteDialog, setResultDeleteDialog] = useState(false);
    const [resultNewDialog, setResultNewDialog] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [result, setResult] = useState(emptyResult);
    const [submitted, setSubmitted] = useState(false);

    const service = new PackageService();
    const toast = useRef(null);
    useEffect(() => {
        setLoading(true);
        service
            .getPackage()
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
    const refreashTable = () => {
        service
            .getPackage()
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
    const openNew = () => {
        setResult(emptyResult);
        setSubmitted(false);
        setResultDialog(true);
        setResultNewDialog(true);
    };
    const editResult = (rowData) => {
        setEditableData(rowData);
        setResultDialog(true);
    };
    const confirmDeleteResult = (rowData) => {
        setEditableData(rowData);
        setResultDeleteDialog(true);
        setEditableData(rowData);
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
        service
            .createPackage(result)
            .then((res) => {
                setLoading(true);
                toast.current.show({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: 'Successfully added a new Package',
                    life: 4000
                });
                refreashTable();
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Error occured', life: 4000 });
            })
            .finally(() => {
                setResultDialog(false);

                // setResult(emptyResult);
            });
    };
    const updateResult = () => {
        debugger;
        let Id = editableData.id;
        service
            .updatePackage(Id, result)
            .then((res) => {
                setLoading(true);
                toast.current.show({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: 'Successfully Updated',
                    life: 4000
                });
                refreashTable();
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Error occured', life: 4000 });
            })
            .finally(() => {
                setResultDialog(false);

                // setResult(emptyResult);
            });
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
                <div className="my-2">
                    <Button label="Create New" icon="pi pi-plus" onClick={openNew} />
                </div>
            </React.Fragment>
        );
    };
    const rightToolbarTemplate = () => {
        return <></>;
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning pl-1 mr-2" onClick={() => editResult(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger pl-1 mr-2" onClick={() => confirmDeleteResult(rowData)} />
            </div>
        );
    };
    const resultDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text btn-success" onClick={hideDialog} />
            {waiting ? <Button label="Saving" icon="pi pi-spin pi-spinner" disabled={true} /> : <Button label="Save" icon="pi pi-save" className="btn-danger" onClick={resultNewDialog ? saveResult : updateResult} />}
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
            >
                <Column field="packageName" header="Package Name" />
                <Column field="description" header="Description" />
                <Column field="packageAmount" header="Package Ammount" />
                <Column field="noTask" header="Number of Task" />
                <Column field="taskValue" header="Task Value" />
                <Column header="Action" body={actionBodyTemplate} />
            </DataTable>
            <Dialog visible={resultDialog} style={{ width: '700px' }} header="" modal className="p-fluid" footer={resultDialogFooter} onHide={hideDialog}>
                <div className="card p-fluid">
                    <h4 className="text-center">Packages</h4>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="packageName">Package Name</label>
                            <InputText id="packageName" value={result.packageName} onChange={(e) => onInputChange(e, 'packageName')} required className={classNames({ 'p-invalid': submitted && !result.packageName })} />
                            {submitted && !result.packageName && <small className="p-invalid text-danger">packageName is required.</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="description">description</label>
                            <InputText id="description" value={result.description} onChange={(e) => onInputChange(e, 'description')} required className={classNames({ 'p-invalid': submitted && !result.description })} />
                            {submitted && !result.description && <small className="p-invalid text-danger">description is required.</small>}
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="packageAmount">packageAmount</label>
                            <InputText type="number" id="packageAmount" value={result.packageAmount} onChange={(e) => onInputChange(e, 'packageAmount')} required className={classNames({ 'p-invalid': submitted && !result.packageAmount })} />
                            {submitted && !result.packageAmount && <small className="p-invalid text-danger">packageAmount is required.</small>}
                        </div>

                        <div className="field col">
                            <label htmlFor="noTask">noTask</label>
                            <InputText id="noTask" type="number" value={result.noTask} onChange={(e) => onInputChange(e, 'noTask')} required className={classNames({ 'p-invalid': submitted && !result.noTask })} />
                            {submitted && !result.noTask && <small className="p-invalid text-danger">noTask is required.</small>}
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="taskValue">taskValue</label>
                            <InputText id="taskValue" type="number" value={result.taskValue} onChange={(e) => onInputChange(e, 'taskValue')} required className={classNames({ 'p-invalid': submitted && !result.taskValue })} />
                            {submitted && !result.taskValue && <small className="p-invalid text-danger">taskValue is required.</small>}
                        </div>
                    </div>
                </div>
            </Dialog>
            <Dialog visible={resultDeleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteResultDialogFooter} onHide={hideDeleteResultDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {result && (
                        <span>
                            Are you sure you want to delete <b>{result.Divisioncode}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </>
    );
}
