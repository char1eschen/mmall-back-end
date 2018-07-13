/*
* @Author: char1eschen
* @Date:   2018-07-13 11:25:17
* @Last Modified by:   char1eschen
* @Last Modified time: 2018-07-13 11:25:17
*/
import React from 'react';

class PageTitle extends React.Component{
  constructor(props){
    super(props);  
  }
  componentWillMount(){
    document.title = this.props.title + ' - MMALL';
  }
  render(){
    return(
      <div id="wrapper">
        <div className="row">
          <div className="col-md-12">
            <h1 className="page-header">{this.props.title}</h1>
            {this.props.children}
          </div>
        </div>
      </div>
    );   
  }
}

export default PageTitle;
