import React from 'react';
import Link from 'next/link';
import AppConfig from '../../../layout/AppConfig';
import { Ripple } from 'primereact/ripple';
import { Button } from 'primereact/button';
function NotFound() {
    return (
        <>
            <svg viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" className="min-h-screen min-w-screen fixed left-0" style={{ bottom: '-10rem' }} preserveAspectRatio="none">
                <rect x="0" y="0" width="960" height="540" fill="var(--surface-ground)"></rect>
                <path
                    d="M0 331L26.7 321C53.3 311 106.7 291 160 291C213.3 291 266.7 311 320 329.5C373.3 348 426.7 365 480 373.2C533.3 381.3 586.7 380.7 640 373.8C693.3 367 746.7 354 800 341.2C853.3 328.3 906.7 315.7 933.3 309.3L960 303L960 541L933.3 541C906.7 541 853.3 541 800 541C746.7 541 693.3 541 640 541C586.7 541 533.3 541 480 541C426.7 541 373.3 541 320 541C266.7 541 213.3 541 160 541C106.7 541 53.3 541 26.7 541L0 541Z"
                    fill="#20a77c"
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                ></path>
            </svg>
            <div className="px-5 min-h-screen flex justify-content-center align-items-center">
                <div className="z-1 text-center">
                    <div className="text-900 font-bold text-8xl mb-4">404!</div>
                    <p className="line-height-3 mt-0 mb-5 text-700 text-xl font-medium">Page Not Found !</p>
                    <Link href={'/'}>
                        <Button label='Go to Home' className="login-btn" style={{backgroundColor:"#20a77c"}} >
                        <Ripple/>
                        </Button>
                       
                    </Link>
                </div>
            </div>
        </>
    );
}

NotFound.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig minimal />
        </React.Fragment>
    );
};

export default NotFound;
