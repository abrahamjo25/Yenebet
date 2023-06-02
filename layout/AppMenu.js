import AppSubMenu from './AppSubMenu';

const AppMenu = () => {
    const model = [
        {
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-fw pi-home',
                    to: '/dashboard'
                }
            ]
        },
        {
            label: 'Management',
            icon: 'pi pi-th-large',
            items: [
                {
                    label: 'Users',
                    icon: 'pi pi-fw pi-user',
                    to: '/management/users'
                },
                // {
                //     label: 'Roles',
                //     icon: 'pi pi-fw pi-folder',
                //     to: '/management/roles'
                // },
                {
                    label: 'Clients',
                    icon: 'pi pi-fw pi-comments',
                    to: '/management/clients'
                },
                {
                    label: 'Services',
                    icon: 'pi pi-fw pi-check-square',
                    to: '/management/services'
                }
                // {
                //     label: 'Api Claims',
                //     icon: 'pi pi-fw pi-comments',
                //     to: '/management/ApiClaims'
                // },
                // {
                //     label: 'Client Claims',
                //     icon: 'pi pi-fw pi-briefcase',
                //     to: '/management/ClientClaim'
                // },
            ]
        }
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
