import React from 'react';

//table list component
class TableList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isFirstLoading: true
    }
  }
  componentWillReceiveProps(){
    //when list loading at the first time,
    //isFirstLoading = true
    this.setState({
      isFirstLoading: false
    });
  }
  render(){
    //list header
    let tableHeader = this.props.tableHeads.map(
      (tableHead, index) => {
        if(typeof tableHead === 'object'){
          return <th key={index} width={tableHead.width}>{tableHead.name}</th>
        }else if(typeof tableHead === 'string'){
          return <th key={index}>{tableHead}</th>
        }
      }
    );
    //list content
    let listBody = this.props.children;
    //list information
    let listInfo = (
      <tr>
        <td colSpan={this.props.tableHeads.length} className="text-center">
          {this.state.isFirstLoading ? 'Loading data...' : 'No data found'}
        </td>
      </tr>
    );
    let tableBody = listBody.length > 0 ? listBody : listInfo;
    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {tableHeader}
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TableList;
