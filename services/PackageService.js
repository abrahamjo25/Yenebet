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
        return HttpService.putService('/Package/Delete/?id=' + id, data, '');
    };
}
