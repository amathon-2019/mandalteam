import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Room from './Room';

class Router extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={ Home }/>
                <Route path="/register" component={ Register }/>
                <Route path="/room/:id" component={ Room }/>
            </div>
        );
    }
}

export default Router;