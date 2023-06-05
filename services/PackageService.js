import HttpService from './httpService';
export default class PackageService {
    getPackage = (claim) => {
        return HttpService.getService('/Package', '');
    };
}
