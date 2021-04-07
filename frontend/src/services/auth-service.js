import {httpService} from './http-service.js'

class AuthService {
    async login(userName, pwd) {
        const result = await httpService.ajax("POST", "http://localhost/token-auth/", {username: userName, password: pwd});
        
        if (result.token) {
            alert("Loged in with token: " + result.token);
            httpService.setAuthToken(result.token);
            return result.token;
        } else {
            alert("Login failed");
            httpService.setAuthToken(); //dont login
            return null;
        }
        
    }

    logout() {
        httpService.removeAuthToken();
    }

    isLoggedIn() {
        return httpService.hasAuthToken();
    }
}

export const authService = new AuthService();