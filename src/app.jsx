/*
* @Author: char1eschen
* @Date:   2018-07-10 23:16:20
* @Last Modified by:   char1eschen
* @Last Modified time: 2018-07-10 23:48:33
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

import Home from 'page/home/index.jsx';

class App extends React.Component {
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Redirect from="*" to="/"/>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
