import HttpService from './httpService';
export default class PackageService {
    getPackage = (claim) => {
        return HttpService.getService('/Package/Index', '');
    };
    createPackage = (data, claim) => {
        return HttpService.postService('/Package/Create', data, '');
    };
    updatePackage = (id, data, claim) => {
        return HttpService.putService('/Package/Update/?id=' + id, data, '');
    };
    deletePackage = (id, data, claim) => {
        debugger;
        return HttpService.putService('/Package/Delete/' + id, data, '');
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
   
}
