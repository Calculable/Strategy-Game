export class AuthService {

    constructor(httpService) {
        this.httpService = httpService;
    }

    async login(userName, pwd) {
        const result = await this.httpService.ajax("POST", "/token-auth/", {username: userName, password: pwd});

        if (result.token) {
            console.log(result.token);
            this.httpService.setAuthToken(result.token);
            return result.token;
        } else {
            alert("Login failed");
            this.httpService.setAuthToken(); //dont login
            return null;
        }
    }

    logout() {
        this.httpService.removeAuthToken();
    }

    isLoggedIn() {
        return this.httpService.hasAuthToken();
    }
}