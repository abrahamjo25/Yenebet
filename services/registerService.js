import HttpService from './httpService';
export default class RegisterService {
    createAccount = (data, ref) => {
        return HttpService.postService(`/Authenticate/register?Inv=${ref}`, data, '');
    };
    loginAccount = (data, claim) => {
        return HttpService.postService('/Authenticate/login', data, '');
    };
}
