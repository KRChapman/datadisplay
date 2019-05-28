import React, { Component } from 'react';
import ButtonCustom from '../../sharedcomponents/ButtonCustom/ButtonCustom';
import authMethods from './../../helper/authMrthods'
import { Route, Redirect } from 'react-router'
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      isHideConfirm: false,
     }
    this.username = React.createRef();
    this.password = React.createRef();
    this.confirmPassword = React.createRef();
    this.authMethods = new authMethods();
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount(){

   let status = this.authMethods.loggedIn();
    if (status){
      this.setState({ isLoggedIn: true });
   }

  //  else{
  //     this.setState({ isLoggedIn: false  });
  //  }
  }

  signUp = async (e) =>{
    e.preventDefault();
    let username = this.username.current.value;
    let passsword = this.password.current.value
    // NORMALY COMPARE CONFIRM AND OTHER PASSWORD FIELDS
    console.log('username', username );
    let status = await this.authMethods.signUp(username, passsword );
    if (status){
      this.setState({ isLoggedIn: true });
    }
  }

  handleLogin(e){
    e.preventDefault();

    let url = '/users/login'
   // console.log('thisthis', this.username, this.password);
    let username = this.username.current.value;
    let passsword = this.password.current.value
    this.authMethods.login(username, passsword).then(r => {
      this.setState({ isLoggedIn: true });
    })


    // let body = {
    //   username: this.username.current.value,
    //   password: this.password.current.value,
    // }
    // let reqData = {
    //   method: 'post',
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json'
    //   },

    //   body: JSON.stringify(body)
    // }

    // let rawResponse = await fetch(url, reqData);
    // let res = await rawResponse.json()
    // console.log('rawResponse', res );

  }

  logOut = () =>{
    this.authMethods.logout();
    window.location.reload();
    // could redirect if on diff route / or maybe same?
  }

  switch = () =>{
    this.setState({ isHideConfirm: !this.state.isHideConfirm });
  }
  render() {
    let submit = this.state.isHideConfirm ? this.handleLogin : this.signUp 
    let submitLabel = this.state.isHideConfirm ?   "Login" : "Sign Up"
     
    let form =( <div>
    
      <form action="" onSubmit={submit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" ref={this.username} />

        <label htmlFor="username">password</label>
        <input type="text" name="password" ref={this.password} />
        {!this.state.isHideConfirm && <input type="text" name="confirmpassword" ref={this.confirmPassword} />}
        <ButtonCustom >{submitLabel}</ButtonCustom >
      </form>
      <ButtonCustom clickEvent={this.switch}>Switch</ButtonCustom >
    </div>
    )
    let logOut = <ButtonCustom clickEvent={this.logOut}>log Out</ButtonCustom >;
    let submitInfo = this.state.isLoggedIn ? logOut : form
    
    return ( 
      <div>
        {submitInfo}
     </div>
     )
  }
}
 
export default LogIn;