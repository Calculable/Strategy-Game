export function submitLogin() {

    let usernameInput = document.getElementById("username-input");
    let passwordInput = document.getElementById("password-input");
    
     fetch("/login", {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({username: usernameInput.value, password: passwordInput.value}),
         credentials: "include"
     }).then(function (res) {console.log("check response")});

}