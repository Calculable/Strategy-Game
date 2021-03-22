export function addLoginFormSubmitListener() {

    let loginForm = document.getElementById("login-form");
    let usernameInput = document.getElementById("username-input");
    let passwordInput = document.getElementById("password-input");

    loginForm.addEventListener("submit", event => {
            event.preventDefault();
            fetch("/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: usernameInput.value, password: passwordInput.value}),
                credentials: "include"
            }).then(function (res) {alert(res);});
    });

}