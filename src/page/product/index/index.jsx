/*
* @Author: char1eschen
* @Date:   2018-07-18 22:46:40
* @Last Modified by:   char1eschen
* @Last Modified time: 2018-07-18 22:46:40
*/

import React from 'react';
import { Link } from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import ListSearch from './index-list-search.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';

import './index.scss'

const _mm = new MUtil();
const _product = new Product();

class ProductList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list'
    };
  }
  componentDidMount(){
    this.loadProductList();
  }
  //load product list
  loadProductList(){
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //if use search function, search type 
    //and search keyword are needed
    if(this.state.listType === 'search'){
      listParam.searchType = this.state.searchType;
      listParam.keyword = this.state.searchKeyword;
    }
    //require API
    _product.getProductList(listParam).then(res => {
      this.setState(res)
    },errMsg => {
      this.setState({
        list: []
      });
      _mm.errorTips(errMsg);
    });
  }
  //search
  onSearch(searchType, searchKeyword){
    let listType = searchKeyword === '' ? 'list' : 'search';
    this.setState({
      listType: listType,
      pageNum: 1,
      searchType: searchType,
      searchKeyword: searchKeyword
    }, () => {
      this.loadProductList();
    });
  }
  //when page number change
  onPageNumChange(pageNum){
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadProductList();
    });
  }
  //change product status
  onSetProductStatus(e, productId, currentStatus){
    let newStatus = currentStatus == 1 ? 2: 1,
        confirmTips = currentStatus == 1 
        ? 'Confirm to discontinue product?' 
        : 'Confirm to launch product?';
    if(window.confirm(confirmTips)){
      _product.setProductStatus({
        productId: productId,
        status: newStatus
      }).then(res => {
        _mm.successTips(res);
        this.loadProductList();
      }, errMsg => {
        _mm.errTips(res);
      });
    }
  }
  render(){
    let tableHeads = [
      {name: 'Product ID', width: '10%'},
      {name: 'Product info', width: '50%'},
      {name: 'Price', width: '10%'},
      {name: 'Status', width: '15%'},
      {name: 'Operation', width: '15%'}
    ];
    return(
      <div id="page-wrapper">
        <PageTitle title="Products list">
          <div className="page-header-right">
            <Link to="/product/save" className="btn btn-primary">
              <i className="fas fa-plus-circle"></i>
              <span>Add product</span>
            </Link>
          </div>
        </PageTitle>
        <ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}} />
        <TableList tableHeads={tableHeads}>
          {
            this.state.list.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>
                    <p>{product.name}</p>
                    <p>{product.subtitle}</p>                    
                  </td>
                  <td>${product.price}</td>
                  <td>
                    <p>{product.status == 1 ? 'On sale' : 'Not for sale'}</p>
                    <button className="btn btn-xs btn-warning"
                      onClick={(e) => {this.onSetProductStatus(e, product.id, product.status)}}>{product.status == 1 ? 'Discontinue' : 'Launch'}</button>
                  </td>
                  <td>
                    <Link className="opera" to={ `/product/detail/${product.id}` }>Details</Link>
                    <Link className="opera" to={ `/product/save/${product.id}` }>Edit</Link>
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

export default ProductList;
