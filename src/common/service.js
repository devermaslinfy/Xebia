/* all http request */
import axiosConfiguration from '../assets/configs/axios-config';

const httpRequest = {
    get : function(url) {
        url = axiosConfiguration.baseUrl + url;
        return fetch(url);
    }
}

export default httpRequest;