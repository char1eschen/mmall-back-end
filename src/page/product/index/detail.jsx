/*
* @Author: char1eschen
* @Date:   2018-07-18 22:46:40
* @Last Modified by:   char1eschen
* @Last Modified time: 2018-07-18 22:46:40
*/

import React from 'react';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';

import './save.scss'

const _mm = new MUtil();
const _product = new Product();

class ProductDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      subtitle: '',
      price: '',
      stock: '',
      detail: '',
      status: 1, //status = 1 means on sale
      categoryId: 0,
      parentCategoryId: 0,
      subImages: []
    }
  }
  componentDidMount(){
    this.loadProduct();
  }
  //load product details
  loadProduct(){
    if(this.state.id){
      _product.getProduct(this.state.id).then((res) => {              let images = res.subImages.split(',');
        res.subImages = images.map((imgUri) => {
          return {
            uri: imgUri,
            url: res.imageHost + imgUri
          }
        });
          this.setState(res);
      }, (errMsg) => {
        _mm.errorTips(errMsg);
      });
    }
  }
  render(){
    return(
      <div id="page-wrapper">
        <PageTitle title="Add product" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">Product Name</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.name}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Description</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.subtitle}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Category</label>
            <CategorySelector
              readOnly 
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId} />
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Price</label>
              <div className="col-md-3">
                <div className="input-group">
                  <input type="number" className="form-control" 
                    value={this.state.price} readOnly/>
                  <span className="input-group-addon">元</span>
                </div>
              </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Stock</label>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-addon">Qty</span>
                <input type="number" 
                  value={this.state.stock} readOnly
                  className="form-control" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Product image</label>
            <div className="col-md-10">
              {
                this.state.subImages.length ? this.state.subImages.map(
                  (image, index) => (
                    <div className="img-con" key={index}>
                      <img src={image.url} />
                    </div>
                    )
                ) : (<div>No images</div>)
              }
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Product detail</label>
            <div className="col-md-10">
              {this.state.detail}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
