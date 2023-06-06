import HttpService from './httpService';
export default class PackageService {
    getPackage = (claim) => {
        return HttpService.getService('/Package/Index', '');
    };
    createPackage = (data, claim) => {
        debugger;
        return HttpService.postService('/Package/Create', data, '');
    };
    updatePackage = (id, data, claim) => {
        debugger;
        return HttpService.putService('/Package/Update/?id=' + id, data, '');
    };
}
