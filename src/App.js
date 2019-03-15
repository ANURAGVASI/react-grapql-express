import React, { Component } from 'react';

import {ApolloProvider} from "react-apollo";
import Showusers from "./Clients";
import CreateUser from "./createUser";
import {client} from "./apolloClient";

class App extends Component {
  state = {
    isLoading: false,
    users: []
  }

  

  render() {
    return (
      <ApolloProvider client={client} >
        <CreateUser />
        <Showusers/>
      </ApolloProvider>
    );
  }
}

export default App;
