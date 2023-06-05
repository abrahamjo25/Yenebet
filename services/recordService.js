import HttpService from './httpService';
export default class RecordService {
    getRecord = (claim) => {
        return HttpService.getService('/Record/Index', '');
    };
}
