/*index.jsx*/
import React from "react";
import {submitLogin} from '../LoginService.js';
import Layout from "./layout";

class MainPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        };
        this.loginHandler = this.loginHandler.bind(this);
    }

    loginHandler(e) {
        e.preventDefault();
        submitLogin();
        this.setState({
            isLoggedIn: true
        })
    }

    render() {
        return (
            <div className="App">
                <Layout>
                    {this.state.isLoggedIn &&
                        <Gameboard></Gameboard>
                    }
                    {!this.state.isLoggedIn &&
                        <div>
                            <h1>Hey there! Welcome to Strategy Game</h1>
                            <LoginForm loginHandler = {this.loginHandler} ></LoginForm>
                        </div>
                    }
                </Layout>
            </div>
        );
    }

    componentDidMount() {
        //...
    }
};


class LoginForm extends React.Component  {
    render() {
        return (
            <main role="main" className="container">
                <form id="login-form" className="text-center form-signin" action="/play.html" onSubmit={this.props.loginHandler}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="username-input" className="sr-only">Email address</label>
                    <input type="text" id="username-input" className="form-control" defaultValue="Demoplayer" required
                           autoFocus/>
                    <label htmlFor="password-input" className="sr-only">Password</label>
                    <input type="password" id="password-input" className="form-control mt-1" defaultValue="1234"
                           required/>
                    <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">Sign in</button>
                </form>
            </main>
        );
    }
}

function Gameboard() {

    const upcountingArray = Array.from({length: 16}, (_, i) => i + 1);

    return (
        <div className="board">
            {upcountingArray.map(i => {
                return (
                    <img src={"/grass.png"} alt={"Grass Field " + i}/>
                );
            })}
        </div>
    );
}

export default MainPage;