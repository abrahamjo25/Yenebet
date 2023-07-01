import HttpService from './httpService';
export default class RecordService {
    getRecord = () => {
        return HttpService.getService('/Record/Index');
    };
    approveRecord = (id, user, transactionId) => {
        return HttpService.putService(`/Record/check-as-payed?Id=${id}&User=${user}&TransactionId=${transactionId}`);
    };
    revertRecord = (id, user, transactionId) => {
        return HttpService.putService(`/Record/revert-payment?id=${id}&user=${user}&transactionId=${transactionId}`);
    };
}
