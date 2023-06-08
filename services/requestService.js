import HttpService from './httpService';
export default class RequestService {
    getRequests = (claim) => {
        return HttpService.getService('/Request/Index', '');
    };
    createRequest = (data, claim) => {
        return HttpService.postService('/Request/Create', data, '');
    };
    updateRequest = (id, data, claim) => {
        return HttpService.putService('/Request/Update/?id=' + id, data, '');
    };
    deleteRequest = (id, data, claim) => {
        return HttpService.putService('/Request/Delete/' + id, data, '');
    };
}
