import { useRouter } from 'next/router';
import PrimeReact from 'primereact/api';
import { useEventListener, useMountEffect, useResizeListener, useUnmountEffect } from 'primereact/hooks';
import { classNames, DomHandler } from 'primereact/utils';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import AppBreadCrumb from './AppBreadCrumb';
import AppConfig from './AppConfig';
import AppProfileSidebar from './AppProfileSidebar';
import AppSidebar from './AppSidebar';
import AppTopbar from './AppTopbar';
import { LayoutContext } from './context/layoutcontext';

const Layout = (props) => {
    const { layoutConfig, layoutState, setLayoutState, isSlim, isHorizontal, isDesktop } = useContext(LayoutContext);
    const topbarRef = useRef(null);
    const sidebarRef = useRef(null);
    const router = useRouter();
    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(sidebarRef.current.isSameNode(event.target) || sidebarRef.current.contains(event.target) || topbarRef.current.menubutton.isSameNode(event.target) || topbarRef.current.menubutton.contains(event.target));

            if (isOutsideClicked) {
                hideMenu();
            }
        }
    });

    const [bindDocumentResizeListener, unbindDocumentResizeListener] = useResizeListener({
        listener: () => {
            if (isDesktop() && !DomHandler.isTouchDevice()) {
                hideMenu();
            }
        }
    });

    const hideMenu = useCallback(() => {
        setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: false, overlaySubmenuActive: false, staticMenuMobileActive: false, menuHoverActive: false, resetMenu: (isSlim() || isHorizontal()) && isDesktop() }));
    }, [isSlim, isHorizontal, isDesktop, setLayoutState]);

    const blockBodyScroll = () => {
        DomHandler.addClass('blocked-scroll');
    };

    const unblockBodyScroll = () => {
        DomHandler.removeClass('blocked-scroll');
    };

    useMountEffect(() => {
        PrimeReact.ripple = true;
    });

    useEffect(() => {
        if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive || layoutState.overlaySubmenuActive) {
            bindMenuOutsideClickListener();
        }

        if (layoutState.staticMenuMobileActive) {
            blockBodyScroll();
            (isSlim() || isHorizontal()) && bindDocumentResizeListener();
        }

        return () => {
            unbindMenuOutsideClickListener();
            unbindDocumentResizeListener();
            unblockBodyScroll();
        };
    }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive, layoutState.overlaySubmenuActive]);

    useEffect(() => {
        const onRouteChange = () => {
            hideMenu();
        };

        router.events.on('routeChangeComplete', onRouteChange);
        return () => {
            router.events.off('routeChangeComplete', onRouteChange);
        };
    }, [router, hideMenu]);

    useUnmountEffect(() => {
        unbindMenuOutsideClickListener();
    });

    const containerClass = classNames({
        'layout-light': layoutConfig.colorScheme === 'light',
        'layout-dim': layoutConfig.colorScheme === 'dim',
        'layout-dark': layoutConfig.colorScheme === 'dark',
        'layout-colorscheme-menu': layoutConfig.menuTheme === 'colorScheme',
        'layout-primarycolor-menu': layoutConfig.menuTheme === 'primaryColor',
        'layout-transparent-menu': layoutConfig.menuTheme === 'transparent',
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-slim': layoutConfig.menuMode === 'slim',
        'layout-horizontal': layoutConfig.menuMode === 'horizontal',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive,
        'p-input-filled': layoutConfig.inputStyle === 'filled',
        'p-ripple-disabled': !layoutConfig.ripple
    });

    return (
        <React.Fragment>
            <div className={classNames('layout-container', containerClass)}>
                <div ref={sidebarRef} className="layout-sidebar">
                    <AppSidebar />
                </div>
                <div className="layout-content-wrapper">
                    <AppTopbar ref={topbarRef} />

                    <AppBreadCrumb className="content-breadcrumb"></AppBreadCrumb>
                    <div className="layout-content">{props.children}</div>
                    
                </div>
                <AppProfileSidebar />
                <AppConfig />
                <div className="layout-mask"></div>
            </div>
        </React.Fragment>
    );
};

export default Layout;
