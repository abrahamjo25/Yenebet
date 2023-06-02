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
    const nestedMenuitemsGuest = [
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
            label: 'Get Started',
            icon: 'pi pi-clone',
            command: () => {
                router.push('/component/register');
            }
        }
    ];
    const nestedMenuitemsUser = [
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
            label: 'Transaction',
            icon: 'pi pi-fw pi-envelope',
            command: () => {
                router.push('/component/transaction');
            }
        },
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            command: () => {
                router.push('/component/profile');
            }
        },
        {
            label: 'Task',
            icon: 'pi pi-bars',
            command: () => {
                router.push('/component/task');
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
            <Menubar model={!secureLocalStorage.getItem('idToken') ? nestedMenuitemsGuest : nestedMenuitemsUser} end={menubarEndTemplate}></Menubar>
            <div className="col-12">
                <div className="flex flex-column sm:flex-row align-items-center gap-4">
                    <div className="flex flex-column sm:flex-row align-items-center gap-3">
                        <div className="flex flex-column align-items-center sm:align-items-start">
                            <span className="text-600 font-bold text-2xl">Welcome Daniel</span>
                        </div>
                    </div>
                    <div className="flex gap-2 sm:ml-auto">
                        <p>Contact us on Telegram</p>
                        <a target="_blank" href="https://t.me/yenebet2023" rel="noopener noreferrer">
                            <Button type="button" tooltip="Send" tooltipOptions={{ position: 'bottom' }} icon="pi pi-send" className="p-button-rounded" />
                        </a>
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
