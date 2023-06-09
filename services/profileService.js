import HttpService from './httpService';
export default class ProfileService {
    getProfile = (claim) => {
        let userId = '33125';
        return HttpService.getService('/Invitation/Index?userId=' + userId, '');
    };
    getBalance = () => {
        let userId = '33125';
        return HttpService.getService('/Request/GetById/' + userId, '');
    };
}
