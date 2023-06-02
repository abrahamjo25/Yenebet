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
        return <span className="p-input-icon-left">{secureLocalStorage.getItem('idToken') ? <Button label="Logout" icon="pi pi-sign-out" className="p-button-secondary p-button-text" onClick={(e) => logOut()} /> : ''}</span>;
    };
    return (
        <>
            <Image src={yenebet} height={60} width={200} alt="Logo" />
            {/* <img src={yenebet} alt="Logo" height={50} /> */}
            <Menubar model={nestedMenuitems} end={menubarEndTemplate}></Menubar>
        </>
    );
}

Header.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};

export default Header;
