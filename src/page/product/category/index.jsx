import React from 'react';
import { Link } from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';

import './category.scss'
const _mm = new MUtil();
const _product = new Product();

class CategoryList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: [],
      parentCategoryId: this.props.match.params.categoryId || 0,
      pageNum: 1,
    };
  }
  componentDidMount(){
    this.loadCategoryList();
  }
  componentDidUpdate(prevProps, prevState){
    let oldPath = prevProps.location.pathname,
      newPath = this.props.location.pathname,
      newId   = this.props.match.params.categoryId || 0;
    if(oldPath !== newPath){
      this.setState({
        parentCategoryId : newId
      }, () => {
        this.loadCategoryList();
      });
    }
  }
  //load category list
  loadCategoryList(){
    let listParam = {};
    listParam.pageNum = this.state.pageNum;
    _product.getCategoryList(this.state.parentCategoryId).then(res => {
      this.setState({
        list: res
      });
    }, errMsg => {
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
      this.loadCategoryList();
    });
  }
  onUpdateName(categoryId, categoryName){
    let newName = window.prompt('Please input new category name', categoryName);
    if(newName){
      _product.updateCategoryName({
        categoryId: categoryId,
        categoryName: newName
      }).then(res => {
        _mm.successTips(res);
        this.loadCategoryList();
      }, err => {
        errMsg => {
          _errTips(errMsg);
        }
      });
    }
  }
  render(){
    let listBody = this.state.list.map((category, index) => {
      return (
        <tr key={index}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>
            <a className="opera" onClick={(e) => this.onUpdateName(category.id, category.name)}>Change name</a>
            {
              category.parentId === 0 
              ? <Link to={`/product-category/index/${category.id}`}>View sub-category</Link>
              : null
            }
          </td>
        </tr>
      );
    });
    return(
      <div id="page-wrapper">
        <PageTitle title="Categories list">
          <div className="page-header-right">
            <Link to="/product-category/add" className="btn btn-primary">
              <i className="fas fa-plus-circle"></i>
              <span>Add category</span>
            </Link>
          </div>
        </PageTitle>
        <div className="row">
            <div className="col-md-12">
              <p>Parent category ID: {this.state.parentCategoryId}</p>
            </div>
        </div>
          <TableList tableHeads={['Product Id', 'Product name', 'Edit']}>
            {listBody}
          </TableList>
          <Pagination 
          current={this.state.pageNum} 
          total={this.state.total} 
          onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
      </div>
    );
  }
}

export default CategoryList;
