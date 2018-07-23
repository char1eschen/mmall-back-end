import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class Order{
  //get order list
  getOrderList(listParam){
    let url = '',
        data = {};
    if(listParam.listType === 'list'){
      url = '/manage/order/list.do';
      data.pageNum = listParam.pageNum;
    }else if (listParam.listType === 'search'){
      url = '/manage/order/search.do';
      data.pageNum = listParam.pageNum;
      data.orederNo = listParam.orderNo;
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data
    }); 
  }
  //get order detail
  getOrderDetail(orderNumber){
    return _mm.request({
      type: 'post',
      url: '/manage/order/detail.do',
      data: {
        orderNp: orderNumber
      }
    }); 
  }
  sendGoods(orderNumber){
    return _mm.request({
      type: 'post',
      url: '/manage/order/send_goods.do',
      data: {
        orderNo : orderNumber
      }
    });
  }
}  
export default Order;
