class MUtil{
  request(param){
    return new Promise((resolve, reject) => {
      $.ajax({
        type      : param.type      || 'get',
        url       : param.url       || '',
        dataType  : param.dataType  || 'json',
        data      : param.data      || null,
        success(res){
          //if request successful
          if(0 === res.status){
            typeof resolve === 'fuction' && resolve(res.data, res.msg);
          }
          //didn't login, force login
          else if (10 === res.status){
            this.doLogin();
          }
          //
          else{
            typeof reject === 'fuction' && reject(res.msg || res.data);            
          }
        },
        error(err){
          console.log(err)
          typeof reject === 'fuction' && reject(ree.statusText);            
        }
      });
    }); 
  }
  //redirect to login
  doLogin(){
    window.location.herf = '/login?redirect=' + encodeURIComponent(window.loaction.pathname);
  }
  //get URL
  getUrlParam(name){
    let queryString = window.location.search.split('?')[1] || '',
        reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        result = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }
  //error message
  errorTips(errMsg){
    alert(errMsg || 'Something goes wrong:)')
  }
}

export default MUtil;
