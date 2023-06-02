import { useRouter } from 'next/router';
import { ObjectUtils } from 'primereact/utils';
import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppBreadcrumb = (props) => {
    const router = useRouter();
    const [breadcrumb, setBreadcrumb] = useState({});
    const { breadcrumbs } = useContext(LayoutContext);

    useEffect(() => {
        setBreadcrumb(breadcrumbs.find((crumb) => crumb.to === router.pathname));
    }, [router, breadcrumbs]);

    return (
        <div className={props.className}>
            <nav className="layout-breadcrumb">
                <ol>
                    {ObjectUtils.isNotEmpty(breadcrumb)
                        ? breadcrumb.labels.map((label, index) => {
                              if (index !== 0) {
                                  return (
                                      <React.Fragment key={index}>
                                          <li className="layout-breadcrumb-chevron"> / </li>
                                          <li key={index}>{label}</li>
                                      </React.Fragment>
                                  );
                              }
                              return <li key={index}>{label}</li>;
                          })
                        : null}
                </ol>
            </nav>
        </div>
    );
};

export default AppBreadcrumb;
