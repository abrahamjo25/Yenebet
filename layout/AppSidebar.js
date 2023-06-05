import Link from 'next/link';
import AppMenu from './AppMenu';
import { MenuProvider } from './context/menucontext';
import yenebet from '../pages/component/images/yenebet.png';
import Image from 'next/image';

const AppSidebar = () => {
    return (
        <>
            <Link href="/dashboard" legacyBehavior>
                <a className="app-logo -mt-2">
                <Image src={yenebet} height={55} width={200} alt="Logo" />

                    {/* <img src="/layout/images/AdmasUn.png" height="80%" width=" 350px" className="" /> */}
                </a>
            </Link>
            <div className="layout-menu-container -mt-4">
                <MenuProvider>
                    <AppMenu />
                </MenuProvider>
            </div>
        </>
    );
};

export default AppSidebar;
