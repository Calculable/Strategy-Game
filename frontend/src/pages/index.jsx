/*index.jsx*/
import React from "react";
import {LoginService} from '../services/login-service.js';
import {UiController} from '../services/ui-controller.js';

import Layout from "./layout";
import LoginForm from "./loginForm";
import ResourceCounter from "./resourceCounter";
import Gameboard from "./gameboard";
import {httpService} from "../services/http-service";
import {FakeApiService} from "../services/fake-api-service";
import {ApiService} from "../services/api-service";

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.apiService = new ApiService(httpService);
        this.loginService = new LoginService(httpService);

        this.state = {
            showGameboard: false,
        };

        this.loginHandler = this.loginHandler.bind(this);

        this.uiController = new UiController(this, httpService);
        this.uiController.pollInformation(this);
    }

    async loginHandler(e) {
        //Loading-Indicator could be added here
        e.preventDefault();
        let loginSuccessful = await this.loginService.submitLogin();

        if (loginSuccessful) {
            let workplaceStats = await this.apiService.getWorkplaceStats();
            this.setState({
                workplaceStats: workplaceStats,
                showGameboard: true
            });
        }
    }

    render() {
        return (
            <div className="App">
                <Layout>
                    {this.state.showGameboard &&
                    <div>
                        <ResourceCounter resources={this.state.workplaceStats.resources}
                                         armyCenter={this.state.workplaceStats.armyCenter}></ResourceCounter>

                        <Gameboard workplaceStats={this.state.workplaceStats}
                                   sellPrice={this.state.workplaceStats.sellPrice}
                                   updateWorkplaceHandler={this.uiController.updateWorkplaceHandler.bind(this.uiController)}
                                   buyAndSellHandler={this.uiController.buyAndSellHandler.bind(this.uiController)}
                                   buyAndSellArmyHandler={this.uiController.buyAndSellArmyHandler.bind(this.uiController)}
                                   money={this.state.workplaceStats.resources.money}></Gameboard>
                    </div>
                    }
                    {!this.state.showGameboard &&
                    <div>
                        <h1 className="display-1">
                            Say hello to Strategy Game
                            <br/>
                            <small className={"lead"}>
                                <mark>- a.k.a the game without a name -</mark>
                            </small></h1>

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