import React from 'react';
import RcPagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_GB';
import 'rc-pagination/dist/rc-pagination.min.css';

//pagination component
class Pagination extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="row">
        <div className="col-md-12">
          <RcPagination {...this.props}
            hideOnSinglePage
            showQuickJumper
            locale={localeInfo}/>
        </div>
      </div>
    );
  }
}

export default Pagination;
