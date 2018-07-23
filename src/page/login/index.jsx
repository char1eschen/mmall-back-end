import React from 'react';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

import './index.scss';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/'
    }
  }
  componentWillMount(){
    document.title = 'Login - MMALL ADMIN';
  }
  //input username and password
  onInputChange(e){
    let inputValue = e.target.value,
        inputName = e.target.name;
    this.setState({
      [inputName]: inputValue,
    });
  }
  //press enter
  onInputKeyUp(e){
    if(e.keyCode === 13){
      this.onSubmit();
    }
  }
  //when input value submit
  onSubmit(){
    let loginInfo = {
          username: this.state.username,
          password: this.state.password
        },
        checkResult = _user.checkLoginInfo(loginInfo);
    //validation pass
    if(checkResult.status){
      _user.login(loginInfo).then((res) => {
        _mm.setStorage('userInfo', res);
        this.props.history.push(this.state.redirect);
      }, (errMsg) => {
        _mm.errorTips(errMsg);
      });      
    }
    //validation fail
    else{
      _mm.errorTips(checkResult.msg);
    }
  }
  render(){
    return(
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-pannel">
          <div className="panel-heading">Welcom - MMALL Admin System</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <input type="text" 
                      name="username"
                      className="form-control" 
                      placeholder="Please input username: admin" 
                      onKeyUp={e => this.onInputKeyUp(e)}
                      onChange={e => this.onInputChange(e)}/>
              </div>
              <div className="form-group">
                <input type="password" 
                      name="password"
                      className="form-control" 
                      placeholder="Please input password: admin" 
                      onKeyUp={e => this.onInputKeyUp(e)}
                      onChange={e => this.onInputChange(e)}/>
              </div>
              <button className="btn btn-lg btn-primary btn-block"
                      onClick = {e => {this.onSubmit(e)}}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
