/*
* @Author: char1eschen
* @Date:   2018-07-18 22:46:40
* @Last Modified by:   char1eschen
* @Last Modified time: 2018-07-18 22:46:40
*/

import React from 'react';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

import './category-selector.scss';

//category selector
class CategorySelector extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    }
  }
  componentDidMount(){
    this.loadFirstCategory();
  }
  componentWillReceiveProps(nextProps){
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
      parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
    //if data doesn't change, no nothing
    if(!categoryIdChange && !parentCategoryIdChange){
      return;
    }
    //if only has category
    if(nextProps.parentCategoryId === 0){
      this.setState({
        firstCategoryId: nextProps.categoryId,
        secondCategoryId: 0
      });
    }
    //in has category and sub-category
    else{
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: nextProps.categoryId
      }, () => {
        parentCategoryIdChange && this.loadSecondCategory();
      });
    }   
  }
  //load category
  loadFirstCategory(){
    _product.getCategoryList().then(res => {
      this.setState({
        firstCategoryList: res
      });
    }, errMsg => {
      _mm.errorTips(errMsg);
    });
  }
  //load sub-category
  loadSecondCategory(){
    _product.getCategoryList(this.state.firstCategoryId).then(res => {
      this.setState({
        secondCategoryList: res
      });
    }, errMsg => {
      _mm.errorTips(errMsg);
    });
  }
  //choose category
  onFirstCategoryChange(e){
    if(this.props.readOnly){
      return;
    }
    let newValue = e.target.value || 0;
    this.setState({
      firstCategoryId: newValue,
      secondCategoryId: 0,
      secondCategoryList: []
    }, () => {
      //refresh sub-category
      this.loadSecondCategory();
      this.onPropsCategoryChange();
    });
  }
  //choose sub-category
  onSecondCategoryChange(e){
    if(this.props.readOnly){
      return;
    }
    let newValue = e.target.value || 0;
    this.setState({
      secondCategoryId: newValue
    }, () => {
      this.onPropsCategoryChange();
    });
  }
  //trans choosen categoruId to parent component
  onPropsCategoryChange(){
    //check if props have callback function
    let categoryChangeable = typeof this.props.onCategoryChange === 'function';
    //if have sub-category
    if(this.state.secondCategoryId){
      categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
    }
    //if only have category
    else{
      categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
    }
  }
  render(){
    return(
      <div className="col-md-10">
        <select className="form-control cate-select" 
          value = {this.state.firstCategoryId}
          onChange={(e) => this.onFirstCategoryChange(e)}
          readOnly={this.props.readOnly}>
          <option value="">Please choose category</option>
          {
            this.state.firstCategoryList.map(
              (category, index) => <option value={category.id} key={index}>{category.name}</option>)
          }
        </select>
        {
          this.state.secondCategoryList.length ?
          (<select className="form-control cate-select"
            value={this.state.secondCategoryId}
            onChange={(e) => this.onSecondCategoryChange(e)}
            readOnly={this.props.readOnly}>
            <option value="">Please choose sub-category</option>
            {
              this.state.secondCategoryList.map(
                (category, index) => <option value={category.id} key={index}>{category.name}</option>)
            }
          </select>) : null
        }
      </div>
    );
  }
}

export default CategorySelector;
