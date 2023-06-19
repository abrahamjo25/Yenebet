import React, { useState, useEffect } from 'react';
import Header from '../header';
import Footer from '../footer';
import { Button } from 'primereact/button';
import SnipperModal from '../../../styles/SnipperModal';
const index = () => {
    const [rotating, setRotating] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setRotating(true);
        }, 1000);
        setRotating(false);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            {!rotating ? <SnipperModal /> : ''}
            <div className="col-12">
                <div className="card">
                    <Header />
                    Transaction History
                    <Footer />
                </div>
            </div>
        </>
    );
};

index.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};

export default index;
