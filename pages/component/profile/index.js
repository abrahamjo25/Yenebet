import getConfig from 'next/config';
import React, { useEffect, useState } from 'react';
import Footer from '../footer';
import Header from '../header';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
const index = (props) => {
    let empityResult = {
        BankType: '',
        AccountNumber: '',
        AccountOwner: '',
        Amount: ''
    };
    const [result, setResult] = useState(empityResult);
    const [withdraw, setWithdrawDialog] = useState(false);
    const [filteredBankType, setFilteredBankType] = useState(null);
    let bankTypes = [
        { name: 'Commertial Bank', value: '1' },
        { name: 'Bank of Abyssinia', value: '2' },
        { name: 'Awash Bank ', value: '3' },
        { name: 'Dashen Bank', value: '4' }
    ];
    useEffect(() => {}, []);
    const rowCount = (rowData, props) => {
        let index = parseInt(props.rowIndex + 1, 10);
        return (
            <React.Fragment>
                <span>{index}</span>
            </React.Fragment>
        );
    };
    const user = [
        { name: 'Beti', package: '5000', bonus: '1750' },
        { name: 'Dani', package: '10000', bonus: '3500' },
        { name: 'Birhan', package: '8000', bonus: '2800' }
    ];
    const withdrawTrsDialog = () => {
        setWithdrawDialog(true);
    };
    const hidewithdrawTrsDialog = () => {
        setWithdrawDialog(false);
    };
    const inputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _result = { ...result };
        _result[`${name}`] = val;
        setResult(_result);
    };
    const OndropdawnChange = (e, name) => {
        debugger;
        const val = (e.target && e.target.value) || '';
        let _result = { ...result };
        _result[`${name}`] = val;
        setFilteredBankType(val);
        setResult(_result);
    };
    const withdrawDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hidewithdrawTrsDialog} />
            <Button label="Withdraw" icon="pi pi-check" className="login-btn" raised onClick={''} />
        </>
    );
    return (
        <React.Fragment>
            <div className="col-12">
                <div className="card">
                    <Header />
                    <div className="grid">
                        <div className="col-12 md:col-6 xl:col-4">
                            <div className="card h-full relative overflow-hidden">
                                <svg id="visual" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" className="absolute left-0 top-0 h-full w-full z-1" preserveAspectRatio="none">
                                    <rect x="0" y="0" width="900" height="600" fill="var(--primary-600)"></rect>
                                    <path
                                        d="M0 400L30 386.5C60 373 120 346 180 334.8C240 323.7 300 328.3 360 345.2C420 362 480 391 540 392C600 393 660 366 720 355.2C780 344.3 840 349.7 870 352.3L900 355L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z"
                                        fill="var(--primary-500)"
                                        strokeLinecap="round"
                                        strokeLinejoin="miter"
                                    ></path>
                                </svg>
                                <div className="z-2 relative text-white">
                                    <div className="text-xl font-semibold mb-3">💰 Availlable Balance</div>
                                    <div className="text-2xl mb-5 font-bold">20,000 ETB</div>
                                    <div className="flex align-items-center justify-content-between">
                                        <span className="text-lg">**** **** **** 1412</span>
                                        <span className="font-medium text-lg">Basic</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 xl:col-4">
                            <div className="card h-full">
                                <div className="flex align-items-center justify-content-between mb-3">
                                    <div className="text-900 text-xl font-semibold">📦 Current Package</div>
                                </div>
                                <div className="text-900 text-2xl text-primary mb-5 font-bold">5,000</div>
                                <div className="flex align-items-center justify-content-between">
                                    <span className="text-lg">**** **** **** 1412</span>
                                    <span className="font-medium text-lg">Basic</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 xl:col-2">
                            <div className="card h-full flex flex-column align-items-center justify-content-center">
                                <span className="text-900 text-lg mb-4 font-medium">Upgrade packages to benefit more and get extra Bonus</span>
                                <div className="py-3">
                                    <Button icon="pi pi-upload" label="Upgrade" />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 xl:col-2">
                            <div className="card h-full flex flex-column align-items-center justify-content-center">
                                <span className="text-900 text-lg mb-4 font-medium">The minimum threshold to withdraw money is 300 ETB</span>
                                <div className="py-3">
                                    <Button icon="pi pi-external-link" label="Withdraw" onClick={withdrawTrsDialog} />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 xl:col-4">
                            <div className="card">
                                <div className="text-900 text-xl font-semibold mb-3">Recent Invitations</div>
                                <ul className="list-none p-0 m-0">
                                    <li className="flex align-items-center p-3 border-bottom-1 surface-border">
                                        <div className="flex flex-column">
                                            <span className="text-sm font-medium text-900 mb-1">You</span>
                                            <span>Invited Beletu</span>
                                        </div>
                                        <span className="text-900 ml-auto text-sm">5 hours ago</span>
                                    </li>
                                    <li className="flex align-items-center p-3 mb-3 border-bottom-1 surface-border">
                                        <div className="flex flex-column">
                                            <span className="text-sm font-medium text-900 mb-1">You</span>
                                            <span>Invited Birhan</span>
                                        </div>
                                        <span className="text-sm text-900 ml-auto font-semibold">yesterday</span>
                                    </li>
                                    <li className="flex align-items-center p-3 mb-3 border-bottom-1 surface-border">
                                        <div className="flex flex-column">
                                            <span className="text-sm font-medium text-900 mb-1">You</span>
                                            <span>Invited Aman</span>
                                        </div>
                                        <span className="text-sm text-900 ml-auto font-semibold">yesterday</span>
                                    </li>
                                    <li className="flex align-items-center p-3 mb-3 border-bottom-1 surface-border">
                                        <div className="flex flex-column">
                                            <span className="text-sm font-medium text-900 mb-1">You</span>
                                            <span>Invited Degu</span>
                                        </div>
                                        <span className="text-sm text-900 ml-auto font-semibold">1 day ago</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 xl:col-8">
                            <div className="card">
                                <div className="text-900 text-xl font-semibold mb-3">Total users you invited</div>
                                <DataTable
                                    value={user}
                                    dataKey="id"
                                    paginator
                                    rows={4}
                                    rowsPerPageOptions={[4, 15, 25]}
                                    className="datatable-responsive"
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} results"
                                    emptyMessage="Not found."
                                    responsiveLayout="scroll"
                                >
                                    <Column header="No" className="p-column-title" body={rowCount}></Column>
                                    <Column field="name" header="Invited User" body="" className="p-column-title"></Column>
                                    <Column field="package" header="Package(ETB)" body="" className="p-column-title"></Column>
                                    <Column field="bonus" header="Your Bonus(ETB)" body="" className="p-column-title"></Column>
                                </DataTable>{' '}
                            </div>
                        </div>
                        <Dialog visible={withdraw} style={{ width: '25vw', height: '65vh' }} header={'Withdraw '} modal className="p-fluid" footer={withdrawDialogFooter} onHide={hidewithdrawTrsDialog}>
                            <div className="p-fluid card mt-2 ">
                                <div className="field">
                                    <br />
                                    <label htmlFor="BankType">Account Type*</label>
                                    <Dropdown id="BankType" value={filteredBankType || ''} onChange={(e) => OndropdawnChange(e, 'BankType')} options={bankTypes} optionLabel="name" required placeholder="Select Bank Type" />
                                </div>
                                <div className="field">
                                    <label htmlFor="AccountNumber">Account Number *</label>
                                    <InputText id="AccountNumber" type="number" value={result.AccountNumber} onChange={(e) => inputChange(e, 'AccountNumber')} required />
                                </div>
                                <div className="field">
                                    <label htmlFor="AccountOwner">Account Holder Name *</label>
                                    <InputText id="AccountOwner" value={result.AccountOwner} onChange={(e) => inputChange(e, 'AccountOwner')} required />
                                </div>
                                <div className="field">
                                    <label htmlFor="Amount">Amount *</label>
                                    <InputText id="Amount" type="number" value={result.Amount} onChange={(e) => inputChange(e, 'Amount')} required />
                                </div>
                            </div>
                        </Dialog>
                        <div className="col-12 lg:col-6">
                            <div className="card h-full">
                                <div className="flex align-items-center justify-content-between mb-3">
                                    <div className="text-900 text-xl font-semibold">Profile Link</div>
                                </div>
                                <div className="flex flex-column row-gap-3">
                                    <div className="flex flex-column lg:flex-row gap-3">
                                        <div className="">
                                            <p>
                                                🙏 Copy and invite the below link to your best friends, family or any user.
                                                <br />
                                                <a href="#"> https://www.yenebet.com/search?q=primereact+marigin+left&rlz=1C1GCEU</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 lg:col-6">
                            <div className="card">
                                <div className="text-900 text-xl font-semibold mb-3">
                                    <b>⚠️ Cuation! </b>
                                </div>

                                <p>Use your link only to invite a friend to register on your behalf</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="py-7">
                        <Footer />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
index.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};

export default index;
