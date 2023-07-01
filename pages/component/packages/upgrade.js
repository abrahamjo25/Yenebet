import { Dropdown } from 'primereact/dropdown';
import Footer from '../footer';
import Header from '../header';
import { Checkbox } from 'primereact/checkbox';
import React, { useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import PackageService from '../../../services/PackageService';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
const detail = (prop) => {
    let empityResult = {
        packageId: '',
        // amount: 0,
        bank: '',
        fullName: '',
        transactionId: ''
    };
    const [result, setResult] = useState(empityResult);
    const [results, setResults] = useState(null);
    const router = new useRouter();
    const [banks, setBanks] = useState(null);
    const [packages, setPackage] = useState([]);
    const [filteredBankType, setFilteredBankType] = useState(null);
    const [filteredPackage, setFilteredPackage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const bankService = new PackageService();
    useEffect(() => {
        debugger;
        // console.log(router.query.description);
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
        bankService
            .getPackage()
            .then((res) => {
                setPackage(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    const findMax = () => {
        debugger;
        let cPA = 8000;
        let index = [];
        for (let i = 1; i <= packages.length; i++) {
            if (packages[i]?.packageAmount > cPA) {
                index.push(packages[i]);
            }
        }
        return index;
    };
    const saveResult = () => {
        // result['packageId'] = router.query.id;
        // result['amount'] = router.query.packageAmount;
        bankService.upgradePackage(result).then((res) => {
            if (res.data.status === 3) {
                console.log('MESSAGE', res);
                setResults(res.data);
                toast.current.show({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: `${res.data.message}`,
                    life: 4000
                });
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: `${res.data.message}`,
                    life: 4000
                });
            }
        });
    };
    const clearData = () => {
        setResult(empityResult);
        setFilteredBankType(null);
        setFilteredPackage(null);
    };
    const OndropdawnChange = (e, name) => {
        debugger;
        const val = (e.target && e.target.value) || '';
        let _result = { ...result };
        _result[`${name}`] = val.bankName;
        setFilteredBankType(val);
        setResult(_result);
    };
    const OnPackageChange = (e, name) => {
        debugger;
        const val = (e.target && e.target.value) || '';
        let _result = { ...result };
        _result[`${name}`] = val.id;
        setFilteredPackage(val);
        setResult(_result);
    };
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _result = { ...result };
        _result[`${name}`] = val;
        setResult(_result);
    };
    return (
        <>
            <Header />
            <div className="surface-card border-1 surface-border border-round">
                <Toast ref={toast} />
                <div className="grid grid-nogutter">
                    <div className="col-12 lg:col-6 px-4 py-4 md:px-6">
                        {/* <div className="flex flex-column lg:flex-row flex-wrap lg:align-items-center py-2 mt-3 surface-border"> */}
                        <div className="card col-12">
                            {/* <img src={''} className="w-8rem h-8rem flex-shrink-0 mb-3" alt="product" /> */}
                            <div className="flex-auto lg:ml-3">
                                <div className="grid">
                                    <div className="col-12 lg:col-6 field mb-4">
                                        <span className="text-900 text-xl font-bold">Your Package Name : </span>
                                        <span className="text-900 font-bold">{router.query.packageName}</span>
                                    </div>
                                    <div className="col-12 lg:col-6 field mb-4">
                                        <span className="text-900 text-xl font-bold">Package Price : </span>
                                        <span className="text-900 font-bold">{router.query.packageAmount}</span>{' '}
                                    </div>
                                </div>
                                <div className="text-600 text-sm mb-3">Write description here about upgradin package</div>
                                <div className="flex flex-auto justify-content-between align-items-center"></div>
                            </div>
                        </div>
                        <div className="card grid">
                            <div className=" col-6">
                                <label htmlFor="bank">Account Type*</label>
                                <div className="field col-12 ">
                                    <Dropdown id="bank" value={filteredBankType || ''} onChange={(e) => OndropdawnChange(e, 'bank')} options={banks} optionLabel="bankName" className="w-full" required placeholder="Select Bank Type" />
                                    {submitted && !result.bank && <small className="p-invalid text-danger">bank is required.</small>}
                                </div>
                            </div>
                            <div className=" col-6">
                                <label htmlFor="packageId">Packages*</label>
                                <div className="field col-12 ">
                                    <Dropdown id="" value={filteredPackage || ''} onChange={(e) => OnPackageChange(e, 'packageId')} options={findMax()} optionLabel="packageName" className="w-full" required placeholder="Select Package" />
                                    {submitted && !result.packageId && <small className="p-invalid text-danger">package is required.</small>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 lg:col-4 h-full px-4 py-4 md:px-6">
                        <div className="card col-12">
                            <h2 className="text-center">Place your order</h2>
                            <h6 className="text-center">Provide your contact information to own Package</h6>

                            <div className="field col">
                                <InputText id="fullName" value={result.fullName} onChange={(e) => onInputChange(e, 'fullName')} required placeholder="ሙሉ ስም / Full Name" className={'p-inputtext w-full'} />
                                {submitted && !result.fullName && <small className="p-invalid text-danger">Name is required.</small>}
                            </div>

                            <div className="field col">
                                <InputText id="transactionId" value={result.transactionId} onChange={(e) => onInputChange(e, 'transactionId')} required placeholder="የተከፈለበት መለያ/TransactionId" className={'p-inputtext w-full'} />
                                {submitted && !result.transactionId && <small className="p-invalid text-danger">transactionId is required.</small>}
                            </div>
                            <div className="field col">
                                {waiting ? <Button label="PLACE ORDER" className="p-button-warning" icon="pi pi-spin pi-spinner" disabled={true} /> : <Button label="PLACE ORDER" icon="" className="p-button-warning w-full" onClick={saveResult} />}
                                <Button label="Clear" icon="" className="p-button-text btn-success w-full" onClick={clearData} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 lg:col-4 h-full px-4 py-4 md:px-6"></div>
                </div>
            </div>
            <Footer />
        </>
    );
};

detail.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};

export default detail;
