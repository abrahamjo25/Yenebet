import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { useRouter } from 'next/router';
import yenebet from './images/yenebet.png';
import Image from 'next/image';
import secureLocalStorage from 'react-secure-storage';
import { Button } from 'primereact/button';
function Header({}) {
    const router = useRouter();
    const nestedMenuitems = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-table',
            command: () => {
                router.push('/');
            }
        },
        {
            label: 'Packeges',
            icon: 'pi pi-fw pi-shopping-cart',
            command: () => {
                router.push('/component/packages');
            }
        },
        {
            label: 'Contact',
            icon: 'pi pi-fw pi-envelope',
            command: () => {
                router.push('/component/contact');
            }
        },
        !secureLocalStorage.getItem('idToken')
            ? {
                  label: 'Get Started',
                  icon: 'pi pi-clone',
                  command: () => {
                      router.push('/component/register');
                  }
              }
            : {
                  label: 'Profile',
                  icon: 'pi pi-fw pi-user',
                  command: () => {
                      router.push('/component/profile');
                  }
              }
    ];
    const logOut = () => {
        // secureLocalStorage.clear();
        router.push('/');
    };
    const menubarEndTemplate = () => {
        return (
            <>
                <span className="p-input-icon-left">{secureLocalStorage.getItem('idToken') ? <Button label="Logout" icon="pi pi-sign-out" className="p-button-secondary p-button-text" onClick={(e) => logOut()} /> : ''}</span>
            </>
        );
    };
    return (
        <>
            <Image src={yenebet} height={60} width={200} alt="Logo" />
            {/* <img src={yenebet} alt="Logo" height={50} /> */}
            <Menubar model={nestedMenuitems} end={menubarEndTemplate}></Menubar>
            <div className="col-12">
                <div className="flex flex-column sm:flex-row align-items-center gap-4">
                    <div className="flex flex-column sm:flex-row align-items-center gap-3">
                        <div className="flex flex-column align-items-center sm:align-items-start">
                            <span className="text-900 font-bold text-2xl">Welcome Daniel</span>
                        </div>
                    </div>
                    <div className="flex gap-2 sm:ml-auto">
                        <p>Contact us on Telegram</p>
                        <Button type="button" tooltip="Send" tooltipOptions={{ position: 'bottom' }} icon="pi pi-send" className="p-button-rounded"></Button>
                    </div>
                </div>
            </div>
        </>
    );
}

Header.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};

export default Header;
