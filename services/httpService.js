import { axiosInstance } from '../utilities/axiosAPI';

class HttpService {
    static postService = (path, data) => {
        debugger;
        return axiosInstance.post(path, data, {
            // headers: {
            //     serviceKey: '86rIsmabiYR0OuW1B6NHovQsmWB8',
            //     idToken:localStorage.getItem("idToken"),
            //     accessToken:localStorage.getItem("accessToken"),
            //     clientClaim:clientClaim
            // }
        });
    };

    static putService = (Path, Data) => {
        debugger;
        return axiosInstance.put(Path, Data, {
            // headers: {
            //     serviceKey: '86rIsmabiYR0OuW1B6NHovQsmWB8'
            // }
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
        debugger;
        return axiosInstance.get(relativePath, {
            params: queryString
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
