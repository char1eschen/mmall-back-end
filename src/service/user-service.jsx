import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class User{
  //user login
  login(loginInfo){
    return _mm.request({
      type: 'post',
      url: '/manage/user/login.do',
      data: loginInfo
    });
  }
  //form validation
  checkLoginInfo(loginInfo){
    let username = $.trim(loginInfo.username),
        password = $.trim(loginInfo.password);
    //check username is empty or not
    if(typeof username !== 'string' || username.length === 0){
      return {
        status: false,
        msg: 'Please fill in the username.'
      }
    }
    //check password
    if(typeof password !== 'string' || password.length === 0){
      return {
        status: false,
        msg: 'Please fill in the password.'
      }
    }
    return {
      status: true,
      msg: 'Validation passed'
    }
  }
}

export default User;
