import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import './normalize.css';
import 'bootstrap';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import MainPage from "./pages"; ///< index.jsx will be automatically imported
import AboutPage from "./pages/about";

import React, { Component } from 'react'


class App extends Component {
    render() {
        return (
            <Router>
                <Route>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/about" component={AboutPage} />
                </Route>
            </Router>
        );
    }
}

export default App;
