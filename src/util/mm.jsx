class MUtil{
  request(param){
    return new Promise((resolve, reject) => {
      $.ajax({
        type      : param.type      || 'get',
        url       : param.url       || '',
        dataType  : param.dataType  || 'json',
        data      : param.data      || null,
        success   : res => {
          //if request successful
          if(0 === res.status){
            typeof resolve === 'function' && resolve(res.data, res.msg);
          }
          //didn't login, force login
          else if (10 === res.status){
            this.doLogin();
          }
          //
          else{
            typeof reject === 'function' && reject(res.msg || res.data);            
          }
        },
        error     : err => {
          typeof reject === 'function' && reject(err.statusText);            
        }
      });
    }); 
  }
  //redirect to login
  doLogin(){
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }
  //get URL
  getUrlParam(name){
    let queryString = window.location.search.split('?')[1] || '',
        reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        result = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }
  //successful message
  successTips(successMsg){
    alert(successMsg || 'Operation is successful:)');
  }
  //error message
  errorTips(errMsg){
    alert(errMsg || 'Something goes wrong:(');
  }
  //save data to local machine
  setStorage(name, data){
    let dataType = typeof data;
    //json objects
    if(dataType === 'object'){
        window.localStorage.setItem(name, JSON.stringify(data));
    }
    //normal objects
    else if(['number','string','boolean'].indexOf(dataType) >= 0){
        window.localStorage.setItem(name, data);
    }
    //other unsupport objects
    else{
        alert('Data cannot save to local machine');
    }
  }
  //get local storage
  getStorage(name){
    let data = window.localStorage.getItem(name);
    if(data){
      return JSON.parse(data);
    }
    else{
        return '';
    }
  }
  //delete local storage
  removeStorage(name){
    window.localStorage.removeItem(name);
  }
}

export default MUtil;
