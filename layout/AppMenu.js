import AppSubMenu from './AppSubMenu';

const AppMenu = () => {
    const model = [
        {
            label: '',
            icon: '',
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-fw pi-home text-xl',
                    to: '/'
                },
                {
                    label: 'Management',
                    icon: 'pi pi-th-large',
                    items: [
                        {
                            label: 'Users',
                            icon: 'pi pi-fw pi-user',
                            to: '/auth/users/create'
                        }
                    ]
                },
                {
                    label: 'Packages',
                    icon: 'pi pi-database text-lg',
                    to: '/admin/packages'
                },
                {
                    label: 'Records',
                    icon: 'pi pi-folder-open text-lg',
                    to: '/admin/records'
                },
                {
                    label: 'Requests',
                    icon: 'pi pi-clone text-lg',
                    to: '/admin/requests'
                },
                {
                    label: 'Transactions',
                    icon: 'pi pi-tags text-lg',
                    to: '/admin/transactions'
                },
                {
                    label: 'Daily Task',
                    icon: 'pi pi-user-edit text-lg',
                    to: '/admin/Task'
                }
            ]
        }
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
