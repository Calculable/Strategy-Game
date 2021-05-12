/*Aus WED2 (keine Eigenleistung)*/

import {valueStorage} from './value-storage.js'

const tokenKey = "token";
const localhost = "http://localhost";

class HttpService {

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});

        if (valueStorage.getItem(tokenKey)) {
            fetchHeaders.append("authorization", "JWT " + valueStorage.getItem(tokenKey))
        }

        return fetch(localhost + url, {
            method: method,
            headers: fetchHeaders, body: JSON.stringify(data)
        })
            .then(this.handleErrors)
            .then(x => {
                return x.json();
            }).catch(error => {
                alert(error + " - You will be Redirected to the Login-Page");
                window.location.replace("/");
            });
    }

    setAuthToken(token) {
        valueStorage.setItem(tokenKey, token);
    }

    hasAuthToken() {
        return Boolean(valueStorage.getItem(tokenKey))
    }

    removeAuthToken(token) {
        valueStorage.setItem(tokenKey, undefined);
    }

}

export const httpService = new HttpService();