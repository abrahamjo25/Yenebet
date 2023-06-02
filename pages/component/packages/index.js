import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { Button } from 'primereact/button';
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/router';
const index = () => {
    const router = useRouter();
    const packageDetail = (e) => {
        let token = secureLocalStorage.getItem('idToken');
        if (token === null || token === '') {
            router.push('/component/register');
        } else {
            router.push("/component/packages/detail")
        }
    };
    return (
        <>
            <div className="col-12">
                <div className="card">
                    <Header />
                    <div className="surface-0">
                        <div className="text-900 font-bold text-4xl mb-4 text-center">Package Plans</div>
                        <div className="text-700 text-xl mb-6 text-center line-height-3">
                            <span style={{ color: '#6366F1' }}> Yene</span>Bet is the most powerfull and convenient digital software which gives you usefull packages{' '}
                        </div>
                        <div className="grid">
                            <div className="col-12 lg:col-2 card">
                                <div className="p-3 h-full">
                                    <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                                        <div className="text-900 font-medium text-xl mb-2">Basic</div>
                                        <div className="text-600">Plan description</div>
                                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <div className="flex align-items-center">
                                            <span className="font-bold text-2xl text-900">1000</span>
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
                                        </ul>
                                        <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                                        <Button label="Buy Now" className="p-3 w-full mt-auto" onClick={(e) => packageDetail(e)} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 lg:col-2 card">
                                <div className="p-3 h-full">
                                    <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                                        <div className="text-900 font-medium text-xl mb-2">Premium</div>
                                        <div className="text-600">Plan description</div>
                                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <div className="flex align-items-center">
                                            <span className="font-bold text-2xl text-900">5000</span>
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
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>Duis ultricies lacus sed</span>
                                            </li>
                                        </ul>
                                        <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <Button label="Buy Now" className="p-3 w-full" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 lg:col-2 card">
                                <div className="p-3 h-full">
                                    <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                                        <div className="text-900 font-medium text-xl mb-2">Enterprise</div>
                                        <div className="text-600">Plan description</div>
                                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <div className="flex align-items-center">
                                            <span className="font-bold text-2xl text-900">12,000</span>
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
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>Duis ultricies lacus sed</span>
                                            </li>
                                        </ul>
                                        <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <Button label="Buy Now" className="p-3 w-full p-button-outlined" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 lg:col-2 card">
                                <div className="p-3 h-full">
                                    <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                                        <div className="text-900 font-medium text-xl mb-2">Enterprise</div>
                                        <div className="text-600">Plan description</div>
                                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <div className="flex align-items-center">
                                            <span className="font-bold text-2xl text-900">18,000</span>
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
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>Duis ultricies lacus sed</span>
                                            </li>
                                        </ul>
                                        <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <Button label="Buy Now" className="p-3 w-full p-button-outlined" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 lg:col-2 card">
                                <div className="p-3 h-full">
                                    <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                                        <div className="text-900 font-medium text-xl mb-2">Enterprise</div>
                                        <div className="text-600">Plan description</div>
                                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <div className="flex align-items-center">
                                            <span className="font-bold text-2xl text-900">25,000</span>
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
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>Duis ultricies lacus sed</span>
                                            </li>
                                        </ul>
                                        <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <Button label="Buy Now" className="p-3 w-full p-button-outlined" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 lg:col-2 card">
                                <div className="p-3 h-full">
                                    <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                                        <div className="text-900 font-medium text-xl mb-2">Enterprise</div>
                                        <div className="text-600">Plan description</div>
                                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <div className="flex align-items-center">
                                            <span className="font-bold text-2xl text-900">35,000</span>
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
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>Duis ultricies lacus sed</span>
                                            </li>
                                        </ul>
                                        <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <Button label="Buy Now" className="p-3 w-full p-button-outlined" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="py-7">
                        <Footer />
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
