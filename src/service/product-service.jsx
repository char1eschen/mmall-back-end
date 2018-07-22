import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class Product{
  //get product/search list
  getProductList(listParam){
    let url = '',
        data = {};
    if(listParam.listType === 'list'){
      url = '/manage/product/list.do';
      data.pageNum = listParam.pageNum;
    }else if (listParam.listType === 'search'){
      url = '/manage/product/search.do';
      data.pageNum = listParam.pageNum;
      data[listParam.searchType] = listParam.keyword;
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data
    }); 
  }
  //get product details
  getProduct(productId){
    return _mm.request({
      type: 'post',
      url: '/manage/product/detail.do',
      data: {
        productId: productId || 0
      }
    });
  }
  //change product sales status
  setProductStatus(productInfo){
    return _mm.request({
      type: 'post',
      url: '/manage/product/set_sale_status.do',
      data: productInfo
    }); 
  }
  //check product form
  checkProduct(product){
    let result = {
      status: true,
      msg: 'Validation successful'
    };
    //name
    if(typeof product.name !== 'string' || product.name.length === 0){
      return {
        status: false,
        msg: 'Please fill in the product name.'
      }
    }
    //subtitle
    if(typeof product.subtitle !== 'string' || product.subtitle.length === 0){
      return {
        status: false,
        msg: 'Please fill in the description.'
      }
    }
    //category id
    if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
      return {
        status: false,
        msg: 'Please choose a category.'
      }
    }
    //price
    if(typeof product.price !== 'number' || !(product.price >= 0)){
      return {
        status: false,
        msg: 'Please fill in the correct price.'
      }
    }
    //stock
    if(typeof product.stock !== 'number' || !(product.stock >= 0)){
      return {
        status: false,
        msg: 'Please fill in the product stock.'
      }
    }
    return result;
  }
  //save product
  saveProduct(product){
    return _mm.request({
      type: 'post',
      url: '/manage/product/save.do',
      data: product
    }); 
  }
  /*
   * Catrgory
   */
  getCategoryList(parentCategoryId){
    return _mm.request({
      type: 'post',
      url: '/manage/category/get_category.do',
      data: {
        categoryId: parentCategoryId || 0
      }
    }); 
  }

}  
export default Product;
