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
                    label: 'Account Managment',
                    icon: '',
                    items: [
                        {
                            label: 'Users',
                            icon: 'pi pi-fw pi-user',
                            to: '/management/users'
                        },

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
                    ]
                },
                {
                    label: 'Packages',
                    icon: 'pi pi-fw pi-home',
                    to: '/admin/packages'
                }
            ]
        }
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
