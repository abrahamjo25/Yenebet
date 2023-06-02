import React from 'react';
import Header from '../header';
import Footer from '../footer';
const detail = () => {
    return (
        <>
            <div className="col-12">
                <div className="card">
                    <Header />
                    <h3>Package List detail and payment</h3>
                    <div className="py-7">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

detail.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};

export default detail;
