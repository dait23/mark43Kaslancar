import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import {MainApi} from './views/Api/';

// Containers
//import Full from './containers/Full/'
import App from './App'
// Views
import Login from './views/Pages/Login/'
//import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
//import Page500 from './views/Pages/Page500/'


const networkInterface = createNetworkInterface({ uri: MainApi })

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('graphcoolToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`
    }
    next()
  },
}])


const client = new ApolloClient({ networkInterface })

const history = createBrowserHistory();

ReactDOM.render((
<ApolloProvider client={client}>
  <HashRouter history={history}>
    <Switch>
      <Route exact path="/login" name="Login Page" component={Login}/>
      <Route exact path="/404" name="Page 404" component={Page404}/>
      <Route path="/" name="Home" component={App}/>
    </Switch>
  </HashRouter>
</ApolloProvider>
), document.getElementById('root'))
