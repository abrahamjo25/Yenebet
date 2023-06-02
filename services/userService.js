import HttpService from './httpService';
export default class UserService {
    constructor() {
        this.userBasePath = '/api/v1/User';
        this.roleBasePath = '/api/v1/Role';
    }

    getroles = (claim) => {
        let relativePath = this.roleBasePath + '/GetAll';
        return HttpService.getService(relativePath, '');
    };
    getRoleClaims = (claim) => {
        let relativePath = '/api/v1/ClientClaim/GetAll';
        return HttpService.getService(relativePath, '', claim);
    };
    getSingleRole = (id, claim) => {
        let relativePath = this.roleBasePath + '/GetById?id=' + id;
        return HttpService.getService(relativePath, '');
    };
    createRole = (requestData, claim) => {
        let relativePath = this.roleBasePath + '/Create';
        return HttpService.postService(requestData, relativePath, '', '', '');
    };
    getRoleByClient = (id) => {
        let relativePath = this.roleBasePath + '/GetByClientId?clientId=' + id;
        return HttpService.getService(relativePath, '');
    };
    getUserByClient = (id) => {
        let relativePath = this.userBasePath + '/GetByClientId?clientId=' + id;
        return HttpService.getService(relativePath, '');
    };
    resetAccount = (requestData, claim) => {
        let relativePath = '/identity-server/api/v1/Password/ResetPassword';
        return HttpService.postService(requestData, relativePath, '', '', '', claim);
    };

    updateRole = (requestData, id, claim) => {
        let relativePath = this.roleBasePath + '/Update?id=' + id;
        return HttpService.putService(requestData, relativePath, '', '', '', claim);
    };

    deleteRole = (id, claim) => {
        const relativePath = this.roleBasePath + '/Delete?id=' + id;
        return HttpService.deleteService(relativePath, '');
    };

    activateDeactivateRole = (requestData, id, claim) => {
        const relativePath = this.roleBasePath + '/UpdateStatus';
        return HttpService.putService(requestData, relativePath, '', '', '');
    };

    // About Service
    getAllService = () => {
        let relativePath = '/api/v1/Service/GetAll';
        return HttpService.getService(relativePath, '');
    };
    createNewService = (requestData, claim) => {
        let relativePath = '/api/v1/Service/Create';
        return HttpService.postService(requestData, relativePath, '', '', '');
    };
    deleteService = (id, claim) => {
        const relativePath = '/api/v1/Service/Delete?id=' + id;
        return HttpService.deleteService(relativePath, '');
    };
    updateService = (requestData, id, claim) => {
        let relativePath = '/api/v1/Service/Update?id=' + id;
        return HttpService.putService(requestData, relativePath, '', '', '', claim);
    };
    getSingleService = (id, claim) => {
        let relativePath = '/api/v1/Service/GetByID?id=' + id;
        return HttpService.getService(relativePath, '');
    };

    activateDeactivateService = (requestData, id, claim) => {
        const relativePath = '/api/v1/Service/ActivateDeactivateService';
        return HttpService.putService(requestData, relativePath, '', '', '');
    };

    // Client Service

    getClient = () => {
        let relativePath = '/api/v1/Client/GetAll';
        return HttpService.getService(relativePath, '');
    };
    getSingleClient = (id, claim) => {
        let relativePath = '/api/v1/Client/GetById?id=' + id;
        return HttpService.getService(relativePath, '');
    };

    createClient = (requestData, claim) => {
        let relativePath = '/api/v1/Client/Create';
        return HttpService.postService(requestData, relativePath, '', '', '');
    };
    updateClient = (requestData, id, claim) => {
        let relativePath = '/api/v1/Client/Update?id=' + id;
        return HttpService.patchService(requestData, relativePath, '', '', '', claim);
    };
    deleteClient = (id) => {
        const relativePath = '/api/v1/Client/Delete?id=' + id;
        return HttpService.deleteService(relativePath, '');
    };
    activateDeactivateClient = (requestData, id, claim) => {
        const relativePath = '/api/v1/Client/ActivateDeactivateClient';
        return HttpService.putService(requestData, relativePath, '', '', '');
    };
    // API Claim
    getApiClaim = () => {
        let relativePath = '/api/v1/ApiClaim/GetAll';
        return HttpService.getService(relativePath, '');
    };
    deletApiClaim = (id) => {
        let relativePath = '/api/v1/ApiClaim/Delete?id=' + id;
        return HttpService.deleteService(relativePath, '');
    };
    createApiClaim = (requestData, claim) => {
        let relativePath = '/api/v1/ApiClaim/Create';
        return HttpService.postService(requestData, relativePath, '', '', '');
    };
    deleteApiClaim = (id) => {
        const relativePath = '/api/v1/ApiClaim/Delete?id=' + id;
        return HttpService.deleteService(relativePath, '');
    };
    updateApiClaim = (requestData, id, claim) => {
        let relativePath = '/api/v1/ApiClaim/Update?id=' + id;
        return HttpService.patchService(requestData, relativePath, '', '', '');
    };
    activateDeactivateApiClaim = (requestData, id, claim) => {
        const relativePath = '/api/v1/ApiClaim/UpdateStatus';
        return HttpService.putService(requestData, relativePath, '', '', '');
    };
    getAPIClaimByService = (id) => {
        let relativePath = '/api/v1/ApiClaim/GetAllByServiceId?recordStatus=2&ServiceId=' + id;
        return HttpService.getService(relativePath, '');
    };

    // User Service
    getUsers = () => {
        let relativePath = this.userBasePath + '/GetAll';
        return HttpService.getService(relativePath, '');
    };

    getCompanyUsers = (claim) => {
        let relativePath = this.userBasePath + '/GetCompanyUsers';
        return HttpService.getService(relativePath, '', claim);
    };

    getSingleUser = (id, claim) => {
        const relativePath = this.userBasePath + '/GetById?id=' + id;
        return HttpService.getService(relativePath, '', claim);
    };

    updateUser = (requestData, claim) => {
        const relativePath = this.userBasePath + '/Update';
        return HttpService.putService(requestData, relativePath, '', '', '', claim);
    };

    createUser = (requestData, claim) => {
        let relativePath = this.userBasePath + '/Create';
        return HttpService.postService(requestData, relativePath, '', '', '');
    };

    deleteUser = (id, claim) => {
        let relativePath = this.userBasePath + '/Delete?id=' + id;
        return HttpService.deleteService(relativePath, '');
    };

    activateDeactivateUser = (requestData, claim) => {
        let relativePath = this.userBasePath + '/ActivateDeactivateUser';
        return HttpService.putService(requestData, relativePath, '', '', '');
    };

    // Client Claim
    getClientClaims = (claim) => {
        let relativePath = '/api/v1/ClientClaim/GetAll';
        return HttpService.getService(relativePath, '', claim);
    };
    createClientCliam = (requestData, claim) => {
        let relativePath = '/api/v1/ClientClaim/Create';
        return HttpService.postService(requestData, relativePath, '', '', '');
    };
    deleteClientClaim = (id) => {
        const relativePath = '/api/v1/ClientClaim/Delete?id=' + id;
        return HttpService.deleteService(relativePath, '');
    };
    updateClientClaim = (requestData, id, claim) => {
        let relativePath = '/api/v1/ClientClaim/Update?id=' + id;
        return HttpService.patchService(requestData, relativePath, '', '', '', claim);
    };
    getSingleClientClaim = (id, claim) => {
        debugger;
        let relativePath = '/api/v1/ClientClaim/GetById?id=' + id;
        return HttpService.getService(relativePath, '');
    };
    getClientClaimByClientId = (clientId, claim) => {
        let relativePath = '/api/v1/ClientClaim/GetByClientId?ClientId=' + clientId;
        return HttpService.getService(relativePath, '');
    };
    activateDeactivateClientClaim = (requestData, id, claim) => {
        const relativePath = '/api/v1/ClientClaim/UpdateStatus';
        return HttpService.putService(requestData, relativePath, '', '', '');
    };
}
