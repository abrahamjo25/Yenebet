import HttpService from './httpService';
export default class WithdrawService {
    getWithdraws = (claim) => {
        return HttpService.getService('/Withdraw/Index', '');
    };
    createWithdraw = (data, claim) => {
        return HttpService.postService('/Withdraw/Create', data, '');
    };
    updateWithdraw = (id, data, claim) => {
        return HttpService.putService('/Withdraw/Update/?id=' + id, data, '');
    };
    approveWithdraw = (id, data, claim) => {
        return HttpService.putService('/Withdraw/Approve/' + id, data, '');
    };
    deleteWithdraw = (id, data, claim) => {
        return HttpService.putService('/Withdraw/Delete/' + id, data, '');
    };
}
