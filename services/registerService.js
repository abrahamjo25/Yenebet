import HttpService from './httpService';
export default class RegisterService {
    createAccount = (data, claim) => {
        return HttpService.postService('/Authenticate/register', data, '');
    };
    loginAccount = (data, claim) => {
        return HttpService.postService('/Authenticate/login', data, '');
    };
}
