/*index.jsx*/
import React from "react";
import {loginService} from '../services/login-service.js';
import {apiService} from '../services/api-service.js';
import {UiController} from '../services/ui-controller.js';

import Layout from "./layout";
import LoginForm from "./loginForm";
import ResourceCounter from "./resourceCounter";
import Gameboard from "./gameboard";

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showGameboard: false,
            resourceStats: apiService.getRessourceStats(),
            workplaceStats: apiService.getWorkplaceStats()
        };
        this.loginHandler = this.loginHandler.bind(this);

        this.uiController = new UiController(this);
        this.uiController.pollInformation(this);

    }

    loginHandler(e) {
        e.preventDefault();
        loginService.submitLogin().then((loginSuccessful) => {
            if (loginSuccessful) {
                this.setState({
                    showGameboard: true
                })
            } else {
                //alert("Login nicht erfolgreich");
            }
        });


    }

    render() {
        return (
            <div className="App">
                <Layout>
                    {this.state.showGameboard &&
                    <div>
                        <ResourceCounter resourceStats={this.state.resourceStats}></ResourceCounter>
                        <Gameboard workplaceStats={this.state.workplaceStats}
                                   assignWorkerHandler={this.uiController.assignWorkerHandler.bind(this.uiController)}
                                   levelUpHandler={this.uiController.levelUpHandler.bind(this.uiController)}></Gameboard>
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