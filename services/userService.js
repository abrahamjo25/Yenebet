import HttpService from './httpService';
export default class UserService {
    CreateUser = (data) => {
        return HttpService.postService('Authenticate/register-admin', data);
    };
    GetAllUser = () => {
        return HttpService.getService('Authenticate/get-users');
    };
}
