/*
* @Author: char1eschen
* @Date:   2018-07-18 22:46:40
* @Last Modified by:   char1eschen
* @Last Modified time: 2018-07-18 22:46:40
*/

import React from 'react';
import { Link } from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import Order from 'service/order-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import ListSearch from './index-list-search.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';

const _mm = new MUtil();
const _order = new Order();

class OrderList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list' //list or search
    };
  }
  componentDidMount(){
    this.loadOrderList();
  }
  //load order list
  loadOrderList(){
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //if use search function, search type 
    //and search keyword are needed
    if(this.state.listType === 'search'){
      listParam.orderNo = this.state.orderNumber;
    }
    //require API
    _order.getOrderList(listParam).then(res => {
      this.setState(res)
    },errMsg => {
      this.setState({
        list: []
      });
      _mm.errorTips(errMsg);
    });
  }
  //search
  onSearch(orderNumber){
    let listType = orderNumber === '' ? 'list' : 'search';
    this.setState({
      listType: listType,
      pageNum: 1,
      orderNumber: orderNumber
    }, () => {
      this.loadOrderList();
    });
  }
  //when page number change
  onPageNumChange(pageNum){
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadOrderList();
    });
  }
  render(){
    let tableHeads = ['Order No.', 'Customer', 'Status', 'Total price', 'Order time', 'Detail'];
    return(
      <div id="page-wrapper">
        <PageTitle title="Orders list" />
        <ListSearch onSearch={(orderNumber) => {this.onSearch(orderNumber)}} />
        <TableList tableHeads={tableHeads}>
          {
            this.state.list.map((order, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                  </td>
                  <td>{order.receiverName}</td>
                  <td>{order.statusDesc}</td>
                  <td>${order.payment}</td>
                  <td>{order.createTime}</td>
                  <td>
                    <Link to={`/order/detail/${order.orderNo}`}>Detail</Link>
                  </td>
                </tr>
              );
            })
          }
        </TableList>
        <Pagination 
          current={this.state.pageNum} 
          total={this.state.total} 
          onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
      </div>
    );
  }
}

export default OrderList;
