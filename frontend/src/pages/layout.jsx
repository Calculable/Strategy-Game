import React, {Component} from 'react'
import {FakeApiService} from "../services/fake-api-service";
import {httpService} from "../services/http-service";
import {LoginService} from "../services/login-service";
import {UiController} from "../services/ui-controller";
import {AuthService} from "../services/auth-service";

class Layout extends Component {

    constructor(props) {
        super(props);
        this.authService = new AuthService(httpService);
    }

    render() {
        return (
            <div>
                <Navbar logoutHandler={this.logoutHandler.bind(this)}/>
                {this.props.children}
            </div>
        );
    }

    logoutHandler(e) {
        this.authService.logout();
        window.location.replace("/");
    }
}

class Navbar extends Component {

    render() {
        return (
            <div className="Introduction">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                    <div className="container">
                        <a className="navbar-brand" href="/">Strategy Game</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/about">About</a>
                                    <a className="nav-link" href="#" onClick={this.props.logoutHandler}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Layout;