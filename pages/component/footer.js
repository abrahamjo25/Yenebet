import React from 'react';

const Footer = () => {
    return (
        <div className="col-12 pl-8 py-5">
            <hr />
            <div className="grid text-center md:text-left">
                <div className="col-12 md:col-3">
                    <h4 className="font-medium text-xl line-height-3 mb-3 text-900">Company</h4>
                    <a className="line-height-3 block cursor-pointer mb-2 text-700">About Us</a>
                    <a className="line-height-3 block cursor-pointer mb-2 text-700">News</a>
                    <a className="line-height-3 block cursor-pointer mb-2 text-700">Investor Relations</a>
                    <a className="line-height-3 block cursor-pointer mb-2 text-700">Careers</a>
                    <a className="line-height-3 block cursor-pointer text-700">Media Kit</a>
                </div>

                <div className="col-12 md:col-3 mt-4 md:mt-0">
                    <h4 className="font-medium text-xl line-height-3 mb-3 text-900">Resources</h4>
                    <a className="line-height-3 block cursor-pointer mb-2 text-700">Get Started</a>
                    <a className="line-height-3 block cursor-pointer mb-2 text-700">Learn</a>
                    <a className="line-height-3 block cursor-pointer text-700">Case Studies</a>
                </div>

                <div className="col-12 md:col-3 mt-4 md:mt-0">
                    <h4 className="font-medium text-xl line-height-3 mb-3 text-900">Community</h4>
                    <a className="line-height-3 block cursor-pointer mb-2 text-700">YeneBet</a>
                    <a className="line-height-3 block cursor-pointer mb-2 text-700">Events</a>
                    <a className="line-height-3 block cursor-pointer mb-2 text-700">FAQ</a>
                    <a className="line-height-3 block cursor-pointer text-700">Blog</a>
                </div>

                <div className="col-12 md:col-3 mt-4 md:mt-0">
                    <h4 className="font-medium text-xl line-height-3 mb-3 text-900">Legal</h4>
                    <a className="line-height-3 block cursor-pointer mb-2 text-700">Brand Policy</a>
                    <a className="line-height-3 block cursor-pointer mb-2 text-700">Privacy Policy</a>
                    <a className="line-height-3 block cursor-pointer text-700">Terms of Service</a>
                </div>
            </div>
        </div>
    );
};

Footer.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};

export default Footer;
