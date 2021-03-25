/*index.jsx*/
import React from "react";
import {submitLogin} from '../LoginService.js';
import Layout from "./layout";
import LoginForm from "./loginForm";
import ResourceCounter from "./resourceCounter";
import Gameboard from "./gameboard";

class MainPage extends React.Component {

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
                    <div>
                        <ResourceCounter></ResourceCounter>
                        <Gameboard></Gameboard>
                    </div>
                    }
                    {!this.state.isLoggedIn &&
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