import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { Ripple } from 'primereact/ripple';
import RecordService from '../../../services/recordService';
export default function index() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
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
    const addNewRoleBtn = () => {
        return (
            <React.Fragment>
                <div className="my-2">
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
                <Button icon="pi pi-upload" label="Withdraw" className="p-button-rounded p-button-warning pl-1 mr-2" />
            </div>
        );
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
            <Toolbar className="mb-4" left={addNewRoleBtn} right={searchInput} />
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
                <Column field="noTodayTask" header="Today Task Count" />
                <Column field="packages.packageAmount" header="Package Ammount" />
                <Column field="balance" header="Balance" />
                <Column header="Action" body={actionBodyTemplate} />
            </DataTable>
        </>
    );
}
