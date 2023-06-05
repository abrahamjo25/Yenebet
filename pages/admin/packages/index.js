import React, { useEffect, useRef, useState } from 'react';
import PackageService from '../../../services/PackageService';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { Ripple } from 'primereact/ripple';
export default function index() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
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
    const addNewRoleBtn = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button icon="pi pi-plus" label="New" className="login-btn " style={{ backgroundColor: '#20a77c' }}>
                        <Ripple />
                    </Button>
                </div>
            </React.Fragment>
        );
    };

    const searchInput = () => {
        return (
            <span className="flex gap-4">
                <span className="p-input-icon-left flex"></span>
            </span>
        );
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning pl-1 mr-2" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger pl-1 mr-2" />
            </div>
        );
    };
    return (
        <>
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={addNewRoleBtn} right={searchInput} />
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
        </>
    );
}
