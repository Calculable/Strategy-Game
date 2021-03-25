import React from 'react';
import {Route} from 'react-router';
/**
 * Import all page components here
 */
import App from './components/App';
import LoginPage from './components/MainPage';
import MainPage from './components/SomeOtherPage';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
    <Route path="/" component={App}>
        <Route path="/" component={MainPage}/>
        <Route path="/login" component={LoginPage}/>
    </Route>
);