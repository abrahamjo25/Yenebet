import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { Button } from 'primereact/button';
const index = () => {
    return (
        <>
            <div className="col-12">
                <div className="card">
                    <Header />
                    Contact
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
