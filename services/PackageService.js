import HttpService from './httpService';
export default class PackageService {
    getPackage = (claim) => {
        return HttpService.getService('/Package/Index', '');
    };
    createPackage = (data, claim) => {
        return HttpService.postService('/Package/Create', data, '');
    };
    updatePackage = (id, data, claim) => {
        return HttpService.putService('/Package/Update/' + id, data, '');
    };
    deletePackage = (id, data, claim) => {
        debugger;
        return HttpService.putService('/Package/Delete/' + id, data, '');
    };
    //// Bank
    getBank = (claim) => {
        return HttpService.getService('/Bank/Index', '');
    };
    createBank = (data, claim) => {
        return HttpService.postService('/Bank/Create', data, '');
    };
    updateBank = (id, data, claim) => {
        return HttpService.putService('/Bank/Update/' + id, data, '');
    };
    deleteBank = (id, data, claim) => {
        return HttpService.putService('/Bank/Delete/' + id, data, '');
    };

    /////////Task
    getTask = (claim) => {
        return HttpService.getService('/Task/Index', '');
    };
    createTask = (data, claim) => {
        return HttpService.postService('/Task/Create', data, '');
    };
    updateTask = (id, data, claim) => {
        return HttpService.putService('/Task/Update/' + id, data, '');
    };
    deleteTask = (id, data, claim) => {
        debugger;
        return HttpService.putService('/Task/Delete/' + id, data, '');
    };
    /////// Buy Package
    buyPackage = (data, claim) => {
        debugger;
        return HttpService.postService('/Record/Create', data, '');
    };
    upgradePackage = (data, claim) => {
        debugger;
        return HttpService.putService('/Record/Upgrade', data, '');
    };
}
