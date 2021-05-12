/*index.jsx*/
import React from "react";
import {LoginService} from '../services/login-service.js';
import {UiController} from '../services/ui-controller.js';

import Layout from "./layout";
import LoginForm from "./loginForm";
import ResourceCounter from "./resourceCounter";
import Gameboard from "./gameboard";
import {httpService} from "../services/http-service";
import {ApiService} from "../services/api-service";
import {FakeApiService} from "../services/fake-api-service";

class MainPage extends React.Component {

    constructor(props) {
        super(props);


        this.apiService = new ApiService(httpService);
        this.loginService = new LoginService(httpService);

        this.state = {
            showGameboard: false,
            //resourceStats: this.apiService.getRessourceStats(),
            //workplaceStats: this.apiService.getWorkplaceStats()
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

                //let resourceStats = await this.apiService.getRessourceStats();
                let workplaceStats = await this.apiService.getWorkplaceStats();

                this.setState({
                    workplaceStats: workplaceStats,
                    showGameboard: true
                    //resourceStats: resourceStats,

                });
            } else {
                //alert("Login failed");
            }
        }




    render() {
        return (
            <div className="App">
                <Layout>
                    {this.state.showGameboard &&
                    <div>
                        <ResourceCounter wood={this.state.workplaceStats.woodcutters.amountWood} coal={this.state.workplaceStats.mine.amountCoal} ironOre={this.state.workplaceStats.mine.amountIronOre} money={this.state.workplaceStats.townhall.money} workers={this.state.workplaceStats.townhall.amountWorkersOwned}></ResourceCounter>

                        <Gameboard workplaceStats={this.state.workplaceStats}
                                   updateWorkplaceHandler={this.uiController.updateWorkplaceHandler.bind(this.uiController)}></Gameboard>

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