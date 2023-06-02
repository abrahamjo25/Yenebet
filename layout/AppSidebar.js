import Link from 'next/link';
import AppMenu from './AppMenu';
import { MenuProvider } from './context/menucontext';

const AppSidebar = () => {
    return (
        <>
            <Link href="/dashboard" legacyBehavior>
                <a className="app-logo -mt-6">
                    <img src="/layout/images/AdmasUn.png" height="80%" width=" 350px" className="" />
                </a>
            </Link>
            <div className="layout-menu-container -mt-8">
                <MenuProvider>
                    <AppMenu />
                </MenuProvider>
            </div>
        </>
    );
};

export default AppSidebar;
