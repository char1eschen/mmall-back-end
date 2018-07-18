import React from 'react';
import { Link } from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      firstLoading: true
    };
  }
  componentDidMount(){
    this.loadUserList();
  }
  loadUserList(){
    _user.getUserList(this.state.pageNum).then(res => {
      this.setState(res, () => {
        this.setState({
          firstLoading: false
        });
      })
    },errMsg => {
      this.setState({
        list: []
      });
      _mm.errorTips(errMsg);
    });
  }
  //when page number change
  onPageNumChange(pageNum){
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList();
    });
  }
  render(){
    let listBody = this.state.list.map((user, index) => {
      return (
        <tr key={index}>
          <th>{user.id}</th>
          <th>{user.username}</th>
          <th>{user.email}</th>
          <th>{user.phone}</th>
          <th>{new Date(user.createTime).toLocaleString()}</th>
        </tr>
      );
    });
    let listError = (
      <tr>
        <td colSpan="5" className="text-center">
          {this.state.firstLoading ? 'Loading data...' : 'No data found'}
        </td>
      </tr>
    );
    let tableBody = this.state.list.length > 0 ? listBody : listError;
    return(
      <div id="page-wrapper">
        <PageTitle title="User list"/>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Regist date</th>
                </tr>
              </thead>
              <tbody>
                {
                  tableBody
                }
              </tbody>
            </table>
          </div>
        </div>
        <Pagination 
          current={this.state.pageNum} 
          total={this.state.total} 
          onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
      </div>
    );
  }
}

export default UserList;
