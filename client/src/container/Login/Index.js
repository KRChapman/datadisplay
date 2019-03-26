import React, { Component } from 'react';
import ButtonCustom from '../../sharedcomponents/ButtonCustom/ButtonCustom';
  
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
    this.username = React.createRef();
    this.password = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(e){
    e.preventDefault();

    let url = '/users/login'
   // console.log('thisthis', this.username, this.password);
    let body = {
      username: this.username.current.value,
      password: this.password.current.value,
    }
    let reqData = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    // let url = '/'
    let rawResponse = await fetch(url, reqData);
    // rawResponse = rawResponse.json()
    // console.log('rawResponse', rawResponse);

  }
  render() { 
    return ( 
      <form action="" onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" ref={this.username}/>

        <label htmlFor="username">password</label>
        <input type="text" name="password" ref={this.password}/>
        <ButtonCustom >Login</ButtonCustom >
      </form>
      
     )
  }
}
 
export default LogIn;