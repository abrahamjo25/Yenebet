import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import React, { useEffect } from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import '../styles/demo/Demos.scss';
import '../styles/layout/layout.scss';
import dynamic from 'next/dynamic';
import PrimeReact from 'primereact/api';
import { useRouter } from 'next/router';
const MyApp = ({ Component, pageProps }) => {
    PrimeReact.ripple = true;
    const router = useRouter();
    useEffect(() => {
        // const userInfo = secureLocalStorage.getItem("username");
        // if (router.pathname !== "/auth/login" && !userInfo) {
        //     router.push("/auth/login");
        // }
    }, []);
    if (Component.getLayout) {
        return <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider>;
    } else {
        return (
            <LayoutProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </LayoutProvider>
        );
    }
};
export default dynamic(() => Promise.resolve(MyApp), {
    ssr: false
});
