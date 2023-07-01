import HttpService from './httpService';
export default class ProfileService {
    getProfile = () => {
        return HttpService.getService('/Invitation/Index');
    };
    createRequest = (data, claim) => {
        return HttpService.postService('/Request/Create', data, '');
    };
    getBalance = () => {
        return HttpService.getService('/Record/GetBalance');
    };
}

