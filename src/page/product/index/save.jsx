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
import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import './save.scss'

const _mm = new MUtil();
const _product = new Product();

class ProductSave extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.pid,
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
        res.defaultDetail = res.detail;
          this.setState(res);
      }, (errMsg) => {
        _mm.errorTips(errMsg);
      });
    }
  }
  //name, price, stock, description change
  onValueChange(e){
    let name = e.target.name,
        value = e.target.value.trim();
    this.setState({
      [name]: value
    });
  }
  //product selector change
  onCategoryChange(categoryId, parentCategoryId){
    this.setState({
      categoryId: categoryId,
      parentCategoryId: parentCategoryId 
    });
  }
  //upload image successful
  onUploadSuccess(res){
    let subImages = this.state.subImages;
    subImages.push(res);
    this.setState({
      subImages: subImages
    });
  }
  //upload image failed
  onUploadError(errMsg){
    _mm.errorTips(errMsg || 'Uplaod image failed');
  }
  //delete uploaded image
  onImageDelete(e){
    let index = parseInt(e.target.getAttribute('index')),
        subImages = this.state.subImages;
    subImages.splice(index, 1);
    this.setState({
      subImages: subImages
    });
  }
  //rich editor
  onDetailValueChange(value){
    this.setState({
      detail: value
    });
  }
  getSubImagesString(){
    return this.state.subImages.map((image) => image.uri).join(',')
  }
  //submit change
  onSubmit(){
    let product = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      categoryId: parseInt(this.state.categoryId),
      subImages: this.getSubImagesString(),
      detail: this.state.detail,
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      status: this.state.status
    },
    productCheckResult = _product.checkProduct(product);
    if(this.state.id){
      product.id = this.state.id;
    }
    //form validate successful
    productCheckResult = _product.checkProduct(product);
    if(productCheckResult.status){
      _product.saveProduct(product).then((res) => {
        _mm.successTips(res);
        this.props.history.push('/product/index');
      }, (errMsg => {
        _mm.errorTips(errMsg);
      }));
    }
    //form validate failed
    else{
      _mm.errorTips(productCheckResult.msg);
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
              <input type="text" 
                className="form-control" 
                placeholder="Please input product name"
                name="name"
                value={this.state.name}
                onChange={(e) => this.onValueChange(e)} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Description</label>
            <div className="col-md-5">
              <input type="text" 
                className="form-control" 
                placeholder="Please input product description" 
                name="subtitle"
                value={this.state.subtitle}
                onChange={(e) => this.onValueChange(e)} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Category</label>
            <CategorySelector 
              categoryId={this.state.categoryId}
              onCategoryChange={(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)} 
              parentCategoryId={this.state.parentCategoryId} />
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Price</label>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-addon">$</span>
                <input type="number" 
                  className="form-control" 
                  placeholder="Price" 
                  name="price"
                  value={this.state.price}
                  onChange={(e) => this.onValueChange(e)} />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Stock</label>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-addon">Qty</span>
                <input type="number" 
                  className="form-control" 
                  placeholder="Stock" 
                  name="stock"
                  value={this.state.stock}
                  onChange={(e) => this.onValueChange(e)} />
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
                      <i className="fas fa-times" index={index} onClick={(e) => this.onImageDelete(e)}></i>
                    </div>
                    )
                ) : (<div>Please upload image</div>)
              }
            </div>
            <div className="col-md-offset-2 col-md-10 file-upload-con">
              <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                onError={(errMsg) => this.onUploadError(errMsg)}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Product detail</label>
            <div className="col-md-10">
              <RichEditor 
                detail={this.state.detail}
                defaultDetail={this.state.defaultDetail}
                onValueChange={(value => this.onDetailValueChange(value))} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button type="submit" className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSave;
