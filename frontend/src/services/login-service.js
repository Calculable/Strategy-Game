class LoginService {

    async submitLogin(userName, pwd) {

        let usernameInput = document.getElementById("username-input");
        let passwordInput = document.getElementById("password-input");

        //await authService.login(usernameInput.value, passwordInput.value); //comment in when /login Endpoint exists
        //return authService.isLoggedIn();

        return true;
    }
}

export const loginService = new LoginService();
