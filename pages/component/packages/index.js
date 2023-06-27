import React, { useEffect, useState } from 'react';
import Header from '../header';
import Footer from '../footer';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import SnipperModal from '../../../styles/SnipperModal';
import PackageService from '../../../services/PackageService';
const index = () => {
    let emptyResult = {
        packageName: '',
        description: '',
        packageAmount: 0,
        noTask: 0,
        taskValue: 0
    };
    const [waiting, setWaiting] = useState(false);
    const [rotating, setRotating] = useState(false);
    const [result, setResult] = useState(emptyResult);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [filteredBankType, setFilteredBankType] = useState(null);
    const [packageDialog, setPackageDilog] = useState(false);
    const service = new PackageService();
    let bankTypes = [
        { name: 'Commertial Bank', value: '1' },
        { name: 'Bank of Abyssinia', value: '2' },
        { name: 'Awash Bank ', value: '3' },
        { name: 'Dashen Bank', value: '4' }
    ];
    useEffect(() => {
        const timer = setTimeout(() => {
            setRotating(true);
        }, 1000);
        setRotating(false);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        debugger;
        setLoading(true);
        service
            .getPackage()
            .then((res) => {
                console.log('Packages', res.data);
                setResults(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    const packageDetail = (e) => {
        setPackageDilog(true);
    };
    const hideDialog = () => {
        setResult(emptyResult);
        setPackageDilog(false);
    };
    const saveResult = () => {};
    return (
        <>
            {!rotating ? <SnipperModal /> : ''}
            <div className="col-12">
                <div className="card">
                    <Header />

                    <div className="surface-0">
                        <div className="text-900 font-bold text-4xl mb-4 text-center">Package Plans</div>
                        <div className="text-700 text-xl mb-6 text-center line-height-3">
                            <span style={{ color: '#6366F1' }}> Yene</span>Bet is the most powerfull and convenient digital software which gives you usefull packages{' '}
                        </div>
                        <div className="grid">
                            {results?.map((index) => {
                                return (
                                    <div className="col-12 lg:col-3 card">
                                        <div className="p-3 h-full">
                                            <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                                                <div className="text-900 font-medium text-xl mb-2">{index.packageName}</div>
                                                <div className="text-600">{index.description}</div>
                                                <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                                <div className="flex align-items-center">
                                                    <span className="font-bold text-2xl text-900">{index.packageAmount}</span>
                                                    <span className="ml-2 font-medium text-600">ETB</span>
                                                </div>
                                                <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                                <ul className="list-none p-0 m-0 flex-grow-1">
                                                    <li className="flex align-items-center mb-3">
                                                        <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                        <span>Arcu vitae elementum</span>
                                                    </li>
                                                    <li className="flex align-items-center mb-3">
                                                        <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                        <span>Dui faucibus in ornare</span>
                                                    </li>
                                                    <li className="flex align-items-center mb-3">
                                                        <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                        <span>Morbi tincidunt augue</span>
                                                    </li>
                                                    <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                                                    <Button label="Buy Now" className="p-3 w-full mt-auto" onClick={(e) => packageDetail(e)} />
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <hr />
                    <div className="py-7">
                        <Footer />
                        <Dialog visible={packageDialog} style={{ width: '450px' }} header="" modal className="p-fluid" footer={''} onHide={hideDialog}>
                            <h2 className="text-center">Place your order</h2>
                            <h6 className="text-center">Provide your contact information to own Package</h6>

                            <div className="field col">
                                <InputText id="Name" value={result.Name} onChange={(e) => onInputChange(e, 'Name')} required placeholder="ስም / Your Name" className={classNames({ 'p-invalid': submitted && !result.Name })} />
                                {submitted && !result.Name && <small className="p-invalid text-danger">Name is required.</small>}
                            </div>
                            <div className="field col">
                                <InputText id="" value={result.description} onChange={(e) => onInputChange(e, 'description')} required placeholder="ሞባይል / Mobile (09...)" className={classNames({ 'p-invalid': submitted && !result.description })} />
                                {submitted && !result.description && <small className="p-invalid text-danger">description is required.</small>}
                            </div>
                            <div className="field col">
                                <InputText id="" value={result.description} onChange={(e) => onInputChange(e, 'description')} required placeholder="ኢሜል / Email Address" className={classNames({ 'p-invalid': submitted && !result.description })} />
                                {submitted && !result.description && <small className="p-invalid text-danger">description is required.</small>}
                            </div>

                            <div className="card p-fluid">
                                <div className="field col">
                                    <h6>Select Bank</h6>
                                    <p>you can pay with internet banking or cash</p>
                                </div>

                                <div className="field col">
                                    <Dropdown id="BankType" value={filteredBankType || ''} onChange={(e) => OndropdawnChange(e, 'BankType')} options={bankTypes} optionLabel="name" required placeholder="የባንክ አይነት / Bank Type" />
                                    {/* <Dropdown id="noTask" value={result.noTask} onChange={(e) => onInputChange(e, 'noTask')} required placeholder="የባንክ አይነት / Bank Type" className={classNames({ 'p-invalid': submitted && !result.noTask })} /> */}
                                    {submitted && !result.noTask && <small className="p-invalid text-danger">noTask is required.</small>}
                                </div>
                            </div>

                            <div className="field col">
                                {waiting ? <Button label="PLACE ORDER" className="p-button-warning" icon="pi pi-spin pi-spinner" disabled={true} /> : <Button label="PLACE ORDER" icon="" className="p-button-warning" onClick={saveResult} />}
                                <Button label="Go Back" icon="" className="p-button-text btn-success" onClick={hideDialog} />
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    );
};

index.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};

export default index;
