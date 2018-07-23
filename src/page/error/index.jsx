import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';

class Error extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div id="page-wrapper">
        <PageTitle title="Error :("/>
        <div className="row">
          <div className="col-md-12">
            <span>
              Page not found, go back to&nbsp;            
            </span>
            <Link to="/">Home page</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
