import React from 'react';
import getConfig from 'next/config';
import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        const contextPath = getConfig().publicRuntimeConfig.contextPath;

        return (
            <Html lang="en">
                <Head>
                    <link id="theme-link" href={`${contextPath}/theme/theme-dim/indigo/theme.css`} rel="stylesheet"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <div className="layout-preloader-container">
                        <div className="layout-preloader">
                            <span></span>
                        </div>
                    </div>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
