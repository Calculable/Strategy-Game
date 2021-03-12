import logo from './logo.svg';
import './App.css';
import './normalize.css';
import './LoginService.js';


function App() {
  return (
    <div className="App">
        <Introduction></Introduction>
        <LoginForm></LoginForm>
        <RotatingReactLogo></RotatingReactLogo>
    </div>
  );
}

function Introduction() {
    return (
        <div className="Introduction">
            <h1>Hey there! Welcome to Strategy Game</h1>
        </div>
    );
}

function LoginForm() {
    return (

        <div>

            <h2>Login to play</h2>

            <form id="login-form" action="/play.html">
                <label htmlFor="input-username">Username:</label><br/>
                <input type="text" id="username-input" name="username" defaultValue="Demoplayer" required/><br/>
                <label htmlFor="input-password">Password:</label><br/>
                <input type="password" id="password-input" name="password" defaultValue="1234" required/><br/><br/>
                <input type="submit" value="Login" />
            </form>

        </div>
    );
}



function RotatingReactLogo() {
    return (
        <img src={logo} className="App-logo" alt="logo" />
    );
}

export default App;
