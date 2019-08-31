import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Room from './Room';

const client = new ApolloClient({
  uri: "https://6qqekckfi1.execute-api.ap-northeast-2.amazonaws.com/dev/graphql"
});

class Router extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Route exact path="/" component={ Home }/>
                <Route path="/login" component={ Login }/>
                <Route path="/register" component={ Register }/>
                <Route path="/room/:id" component={ Room }/>
            </ApolloProvider>
        );
    }
}

export default Router;