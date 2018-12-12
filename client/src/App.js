import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {

  constructor() {
    super();
    this.state = {

      searchInput: "",
      allInputToSearch: "",
      response: '',
      place: "",
      allPlaces: [],
      healthData: [],
      query: "",
      pictureData: [],

      dataToShare: {
        cords: [],
        health: [],
        yelp: "",
      }
    }
  }

  getSearchInput = (e) => {
    this.setState({ allInputToSearch: e.target.value });
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    this.callApi().then(res => {
      console.log('the res', res);
    }).catch(err => console.log(err))
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    return body;
  }
  render() {
    return (
      <div className="App">
        <form className="the-form" action="/" method="post">
          <label htmlFor="test">Test</label>
          <input type="text" onChange={this.getSearchInput} name="test"/>
          <input type="submit" value="Search" onClick={this.handleSubmit}/>
        </form>
        <button >Put In Database</button>
      </div>
    );
  }
}

export default App;
