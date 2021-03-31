/*index.jsx*/
import React from "react";
import {loginService} from '../LoginService.js';
import Layout from "./layout";
import LoginForm from "./loginForm";
import ResourceCounter from "./resourceCounter";
import Gameboard from "./gameboard";

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showGameboard: false,
        };
        this.loginHandler = this.loginHandler.bind(this);
    }

    loginHandler(e) {
        e.preventDefault();
        loginService.submitLogin().then((loginSuccessful) => {
            if (loginSuccessful) {
                this.setState({
                    showGameboard: true
                })
            } else {
                alert("Login nicht erfolgreich");
            }
        });


    }

    render() {
        return (
            <div className="App">
                <Layout>
                    {this.state.showGameboard &&
                    <div>
                        <ResourceCounter></ResourceCounter>
                        <Gameboard></Gameboard>
                    </div>
                    }
                    {!this.state.showGameboard &&
                    <div>
                        <h1>Hey there! Welcome to Strategy Game</h1>
                        <LoginForm loginHandler={this.loginHandler}></LoginForm>
                    </div>
                    }
                </Layout>
            </div>
        );
    }

    componentDidMount() {
        //...
    }
}


export default MainPage;