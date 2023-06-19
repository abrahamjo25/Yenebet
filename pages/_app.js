import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import React, { useEffect } from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import '../styles/demo/Demos.scss';
import '../styles/layout/layout.scss';
import '../styles/Modal.css';
import dynamic from 'next/dynamic';
import PrimeReact from 'primereact/api';
import { useRouter } from 'next/router';
import secureLocalStorage from 'react-secure-storage';
import { YenebetContextProvider } from './context/yenebetContext';
const MyApp = ({ Component, pageProps }) => {
    PrimeReact.ripple = true;
    const router = useRouter();
    useEffect(() => {
        let token = JSON.parse(secureLocalStorage.getItem('user'));
        if (token === null || token === '') {
            router.push('/');
        }
    }, []);
    if (Component.getLayout) {
        return (
            <YenebetContextProvider>
                <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider>
            </YenebetContextProvider>
        );
    } else {
        return (
            <YenebetContextProvider>
                <LayoutProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </LayoutProvider>
            </YenebetContextProvider>
        );
    }
};
export default dynamic(() => Promise.resolve(MyApp), {
    ssr: false
});
