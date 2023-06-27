import React, { useContext, useEffect, useState } from 'react';
import Footer from '../footer';
import Header from '../header';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ProfileService from '../../../services/profileService';
import { useRef } from 'react';
import { MyContext } from '../../context/yenebetContext';
import SnipperModal from '../../../styles/SnipperModal';
import PackageService from '../../../services/PackageService';
import secureLocalStorage from 'react-secure-storage';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
const index = (props) => {
    const { username, invite } = useContext(MyContext);
    console.log(username);
    let ref = username;
    let empityResult = {
        userId: { username },
        userName: null,
        amount: null,
        bank: null,
        accountNumber: null
    };
    const router = useRouter();
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const [state, setState] = useState({
        value: `/component/register?ref=`,
        copied: false
    });
    const [loading, setLoading] = useState(false);
    const [rotating, setRoating] = useState(false);
    const [buttonText, setButtonText] = useState('Copy');
    const [result, setResult] = useState(empityResult);
    const [results, setResults] = useState(null);
    const [banks, setBanks] = useState(null);
    const [balance, setBalance] = useState(0);
    const [myPackage, setMyPackage] = useState(0);
    const [withdraw, setWithdrawDialog] = useState(false);
    const [filteredBankType, setFilteredBankType] = useState(null);

    const toast = useRef(null);
    const service = new ProfileService();
    const bankService = new PackageService();
    const baseUrl = `${window.location.protocol}//${window.location.host}${router.basePath}`;
    useEffect(() => {
        setLoading(true);
        service
            .getProfile()
            .then((res) => {
                if (res) {
                    setResults(res.data);
                    pi - sign - out;
                }
            })
            .catch((err) => {
                console.log(err);
            });
        service
            .getBalance()
            .then((res) => {
                setBalance(res.data.balance);
                setMyPackage(res.data.packages.packageName);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
        bankService
            .getBank()
            .then((res) => {
                setBanks(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            setRoating(true);
        }, 1000);
        setRoating(false);
        return () => clearTimeout(timer);
    }, []);
    const rowCount = (rowData, props) => {
        let index = parseInt(props.rowIndex + 1, 10);
        return (
            <React.Fragment>
                <span>{index}</span>
            </React.Fragment>
        );
    };
    const withdrawTrsDialog = () => {
        setWithdrawDialog(true);
    };
    const hidewithdrawTrsDialog = () => {
        setWithdrawDialog(false);
        setResult(empityResult);
    };
    const saveResult = () => {
        if (result.userName && result.amount) {
            service
                .createRequest(result)
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

                            life: 4000
                        });
                    }
                })

                .catch((err) => {
                    toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Error occured', life: 4000 });
                })

                .finally(() => {
                    setWithdrawDialog(false);
                });
        }
    };
    const inputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _result = { ...result };
        _result[`${name}`] = val;
        setResult(_result);
    };
    const OndropdawnChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _result = { ...result };
        _result[`${name}`] = val.bankName;
        setFilteredBankType(val);
        setResult(_result);
    };
    const withdrawDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hidewithdrawTrsDialog} />
            <Button label="Send Request" icon="pi pi-check" className="login-btn" raised onClick={saveResult} />
        </>
    );
    const textCopied = () => {
        setState({ copied: true });
        setState({ value: state.value });
        setButtonText('Copied!');
    };
    const bonusBodyTamplate = (rowData) => {
        return <>{rowData.packages.packageAmount * (process.env.NEXT_PUBLIC_API_SERVICE_GAIN_PERCENT / 100)}</>;
    };
    return (
        <React.Fragment>
            <div className="col-12">
                <div className="card">
                    <Header />
                    <Toast ref={toast} />
                    <div className="grid">
                        <div className="col-12 md:col-6 xl:col-4">
                            {!rotating ? (
                                <SnipperModal />
                            ) : (
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
                                        <div className="text-2xl mb-5 font-bold">{balance} ETB</div>
                                        <div className="flex align-items-center justify-content-between">
                                            <span className="text-lg">**** **** **** 1412</span>
                                            <span className="font-medium text-lg">Basic</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-12 md:col-6 xl:col-4">
                            <div className="card h-full">
                                <div className="flex align-items-center justify-content-between mb-3">
                                    <div className="text-900 text-xl font-semibold">📦 Current Package</div>
                                </div>
                                <div className="text-900 text-2xl text-primary mb-5 font-bold">{myPackage}</div>
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
                        <div className="col-12 xl:col-4 h-full">
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
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 xl:col-8 h-full">
                            <div className="card">
                                <div className="text-900 text-xl font-semibold mb-3">Total users you invited</div>
                                <DataTable
                                    value={results}
                                    dataKey="id"
                                    paginator
                                    rows={3}
                                    loading={loading}
                                    rowsPerPageOptions={[3, 9, 15]}
                                    className="datatable-responsive"
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} results"
                                    emptyMessage="Not found."
                                    responsiveLayout="scroll"
                                >
                                    <Column header="No" className="p-column-title" body={rowCount}></Column>
                                    <Column field="fullName" header="Invited User" body="" className="p-column-title"></Column>
                                    <Column field="packages.packageName" header="Package" body="" className="p-column-title"></Column>
                                    <Column field="packages.packageAmount" header="Price(ETB)" body="" className="p-column-title"></Column>
                                    <Column field="bonus" header="Your Bonus(ETB)" body={bonusBodyTamplate} className="p-column-title"></Column>
                                </DataTable>
                            </div>
                        </div>
                        <Dialog visible={withdraw} style={{ width: '450px' }} header={'Withdraw '} modal className="p-fluid" footer={withdrawDialogFooter} onHide={hidewithdrawTrsDialog}>
                            <div className="p-fluid card mt-2 ">
                                <div className="field">
                                    <label htmlFor="userId">User Id *</label>
                                    <InputText id="userId" value={username} disabled={true} onChange={(e) => inputChange(e, 'userId')} required />
                                </div>
                                <div className="field">
                                    <label htmlFor="userName">Full Name *</label>
                                    <InputText id="userName" value={result.userName} onChange={(e) => inputChange(e, 'userName')} required />
                                </div>
                                <div className="field">
                                    <label htmlFor="amount">Amount *</label>
                                    <InputText id="amount" type="number" value={result.amount} onChange={(e) => inputChange(e, 'amount')} required />
                                </div>
                                <div className="field">
                                    <br />
                                    <label htmlFor="bank">Account Type*</label>
                                    <Dropdown id="bank" value={filteredBankType || ''} onChange={(e) => OndropdawnChange(e, 'bank')} options={banks} optionLabel="bankName" required placeholder="Select Bank Type" />
                                </div>
                                <div className="field">
                                    <label htmlFor="accountNumber">account Number *</label>
                                    <InputText id="accountNumber" type="number" value={result.accountNumber} onChange={(e) => inputChange(e, 'accountNumber')} required />
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
                                                <a href="">{baseUrl + state.value + invite}</a>
                                                <br />
                                                <CopyToClipboard text={baseUrl + state.value + invite} onCopy={() => textCopied()}>
                                                    <button>{buttonText}</button>
                                                </CopyToClipboard>
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

                                <p>Use your link only to invite a friend to register on your behalf.</p>
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
