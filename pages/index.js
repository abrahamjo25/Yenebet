import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import Header from './component/header';
import Footer from './component/footer';
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/router';

function Index({}) {
    useEffect(() => {
        secureLocalStorage.setItem('idToken', 'token');
    }, []);
    const router = useRouter();
    const getStarted = () => {
        let token = secureLocalStorage.getItem('idToken');
        if (token === null || token === '') {
            router.push('/component/register');
        } else {
            router.push('/component/packages');
        }
    };
    return (
        <>
            <div className="col-12">
                <div className="card">
                    <Header />
                    <div className="grid grid-nogutter surface-0 text-800 py-3">
                        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                            <section>
                                <span className="block text-6xl font-bold mb-1">Create the screens</span>
                                <div className="text-6xl text-primary font-bold mb-3">You Shall Deserve to see your Dreams </div>
                                <p className="mt-0 mb-4 text-700 line-height-3">Create your profile and benefit more!</p>
                                <Button label="Get Started" type="button" className="p-button-outlined" onClick={getStarted} />
                            </section>
                        </div>
                        <div className="col-12 md:col-6 overflow-hidden">
                            <img src="assets/images/blocks/hero/hero-1.png" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
                        </div>
                    </div>
                    <div className="surface-0 text-center">
                        <div className="mb-3 font-bold text-3xl">
                            <span className="text-900">One Product, </span>
                            <span className="text-blue-600">Many Solutions</span>
                        </div>
                        <div className="text-700 mb-6">Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.</div>
                        <div className="grid">
                            <div className="col-12 md:col-4 mb-4 px-5">
                                <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                    <i className="pi pi-desktop text-4xl text-blue-500"></i>
                                </span>
                                <div className="text-900 text-xl mb-3 font-medium">Built for Developers</div>
                                <span className="text-700 line-height-3">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                            </div>
                            <div className="col-12 md:col-4 mb-4 px-5">
                                <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                    <i className="pi pi-lock text-4xl text-blue-500"></i>
                                </span>
                                <div className="text-900 text-xl mb-3 font-medium">End-to-End Encryption</div>
                                <span className="text-700 line-height-3">Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin aliquam ultrices sagittis.</span>
                            </div>
                            <div className="col-12 md:col-4 mb-4 px-5">
                                <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                    <i className="pi pi-check-circle text-4xl text-blue-500"></i>
                                </span>
                                <div className="text-900 text-xl mb-3 font-medium">Easy to Use</div>
                                <span className="text-700 line-height-3">Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt vitae semper.</span>
                            </div>
                            <div className="col-12 md:col-4 mb-4 px-5">
                                <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                    <i className="pi pi-globe text-4xl text-blue-500"></i>
                                </span>
                                <div className="text-900 text-xl mb-3 font-medium">Fast & Global Support</div>
                                <span className="text-700 line-height-3">Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.</span>
                            </div>
                            <div className="col-12 md:col-4 mb-4 px-5">
                                <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                    <i className="pi pi-github text-4xl text-blue-500"></i>
                                </span>
                                <div className="text-900 text-xl mb-3 font-medium">Open Source</div>
                                <span className="text-700 line-height-3">Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. </span>
                            </div>
                            <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
                                <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                    <i className="pi pi-shield text-4xl text-blue-500"></i>
                                </span>
                                <div className="text-900 text-xl mb-3 font-medium">Trusted Securitty</div>
                                <span className="text-700 line-height-3">Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus aliquam eleifend.</span>
                            </div>
                        </div>
                    </div>
                    <div className="surface-0 text-700 text-center">
                        <div className="text-blue-600 font-bold mb-3">
                            <i className="pi pi-discord"></i>&nbsp;POWERED BY YENEBET
                        </div>
                        <div className="text-900 font-bold text-5xl mb-3">Join Our Design Community</div>
                        <div className="text-700 text-2xl mb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>
                        <Button label="Join Now" icon="pi pi-discord" className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap" />
                    </div>
                    <div className="py-3">
                        <hr />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

Index.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};

export default Index;
