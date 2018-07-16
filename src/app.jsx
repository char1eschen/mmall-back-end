/*
* @Author: char1eschen
* @Date:   2018-07-10 23:16:20
* @Last Modified by:   char1eschen
* @Last Modified time: 2018-07-10 23:48:33
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';

class App extends React.Component {
  render(){
    return(
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/" render={props => (
            <Layout>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/product" component={Home}/>
                <Route path="/product-category" component={Home}/>
                <Route path="/order" component={Home}/>
                <Route path="/user" component={Home}/>
              </Switch>
            </Layout>
          )}/>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
