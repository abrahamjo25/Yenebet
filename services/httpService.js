import axiosInstance from '../utilities/axios';

class HttpService {
    static postService = (requestData, relativePath, queryString = '',idToken,accessToken,clientClaim) => {
        return axiosInstance.post(relativePath + queryString, requestData, {
            headers: {
                serviceKey: '86rIsmabiYR0OuW1B6NHovQsmWB8',
                // idToken:localStorage.getItem("idToken"),
                // accessToken:localStorage.getItem("accessToken"),
                // clientClaim:clientClaim
            }
        });
    };

    static putService = (requestData, relativePath, queryString = '', clientClaim) => {
        return axiosInstance.put(relativePath + queryString, requestData, {
            headers: {
                serviceKey: '86rIsmabiYR0OuW1B6NHovQsmWB8'
            }
        });
    };

    static activateDeactivateService = (activateDeactivateBody, relativePath, clientToken, idToken, queryString = '', clientClaim) => {
        return axiosInstance.put(relativePath, activateDeactivateBody, {
            headers: {
                serviceKey: '86rIsmabiYR0OuW1B6NHovQsmWB8'
            }
        });
    };

    static updateStatus = (activateDeactivateBody, relativePath, clientToken, idToken, queryString = '', clientClaim) => {
        return axiosInstance.put(relativePath, activateDeactivateBody, {
            headers: {
                serviceKey: '86rIsmabiYR0OuW1B6NHovQsmWB8'
            }
        });
    };

    static getService = (relativePath, queryString = '') => {
        return axiosInstance.get(relativePath, {
            params: queryString,
            headers: {
                serviceKey: '86rIsmabiYR0OuW1B6NHovQsmWB8'
            }
        });
    };

    static patchService = (requestBody, relativePath, clientClaim) => {
        return axiosInstance.patch(relativePath, requestBody, {
            headers: {
                serviceKey: '86rIsmabiYR0OuW1B6NHovQsmWB8'
            }
        });
    };

    static deleteService = (relativePath, queryString = '', clientClaim) => {
        return axiosInstance.delete(relativePath, {
            params: queryString,
            headers: {
                serviceKey: '86rIsmabiYR0OuW1B6NHovQsmWB8'
            }
        });
    };
}

export default HttpService;
