import React from 'react';
import { Link } from 'react-router-dom';

class NavTop extends React.Component{
  constructor(props){
    super(props);  
  }
  onLogout(){

  }
  render(){
    return(
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/"><b>M</b>Mall</Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:;">
              <i className="fas fa-user fa-fw"></i> 
              <span>Welcome, adminXXX</span>
              <i className="fas fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a onClick={() => {this.onLogout()}}>
                  <i className="fas fa-sign-out-alt fa-fw"></i> 
                  <span> Logout</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        </div>
    );   
  }
}

export default NavTop;
