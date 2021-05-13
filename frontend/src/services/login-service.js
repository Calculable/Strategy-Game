import {AuthService} from "./auth-service";


export class LoginService {

    constructor(httpService) {
        this.authService = new AuthService(httpService);
    }

    async submitLogin(userName, pwd) {

        let usernameInput = document.getElementById("username-input");
        let passwordInput = document.getElementById("password-input");

        //await this.authService.login(usernameInput.value, passwordInput.value); //comment in when /login Endpoint exists
        //return this.authService.isLoggedIn();
        
       return true;
    }
}
