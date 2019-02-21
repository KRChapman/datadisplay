import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import DataDisplay from './container/datadisplay/datadisplay';
import ButtonCustom from './sharedcomponents/ButtonCustom/ButtonCustom';
import UserInput from './sharedcomponents/UserInput/UserInput';
import RadioForm from './sharedcomponents/RadioForm/RadioForm';
import UserSelect from './sharedcomponents/UserSelect/UserSelect';
import Selection from './container/Selection/Selection';


const backEndAPIs = {
  mdb: {
    
    create: "/createMDB",
    view: '/viewMDB',
  },
  file: {
    create: "/createfile",
    view: '/viewfile',
    update: '/updatefile',
    delete: '/deletefile',
  },
  pg: {

  }

}

// { title: "placeholder", user: "t", listItems: [{ userInput: "here", numbers: [1, 2, 3, 4] }], _id: "123" },
// { title: "2placeholder", user: "2t", listItems: [{ userInput: "2here", numbers: [1, 2, 3, 4] }], _id: "1234" }

class App extends Component {

  constructor() {
    super();
      this.state = {

        data : [
         
      ],
      // need log in page user authentication and authorization
        user: "default",

        title: "",
        userInput: "",
        numbers: [],
        backEnd: "mdb",
        backEndAPIs: backEndAPIs.mdb,
        usersList: [],
        currentUser: "default",
    }

  

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.submitDataInput = this.submitDataInput.bind(this);
  }
  componentDidMount(){
   //let dataToDisplay =

    Promise.all([this.showDataToDisplay(), this.showUsers(), this]).then(function ([data, users, self]) {
   
      self.setState({ data: data , usersList: users });
    })

  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.data !== prevState.data){

    }

    if(prevState.currentUser !== this.state.currentUser){
      Promise.resolve(this.showDataToDisplay()).then( data => {
        this.setState({ data });
      }) 
    }
  }

  showUsers = () => {
    let url = this.state.backEndAPIs.view;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        return myJson;

      });
  }

  showDataToDisplay = () =>{
    if (this.state.currentUser === ""){
      return [];
    }
    let userUrl = `${this.state.backEndAPIs.view}/${this.state.currentUser}`
  
   let a = fetch(userUrl)
      .then(function (response) {  
        return response.json();
      },err =>{
                console.log("err", err);
        return null;
      })
      .then(function (myJson) {
        return myJson;

      })

    return a;
      // .catch(err => {
      //   console.log("err", err);
      //   return null;
      // })
    
  }

  changeDataInCard(e){
    // CHECK IF YOU CAN RETUNR ALL LIKE FETCH PROMISE ABOVE!!!
// https://stackoverflow.com/questions/29775797/fetch-post-json-data
    (async () => {
      const rawResponse = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ a: 1, b: 'Textual content' })
      });
      const content = await rawResponse.json();

      console.log(content);
    })();
  }

  handleChangeInput(e){
    var userData
    if (e.target.name === "numbers"){
      userData =  ("" + e.target.value).split('').map(Number) 
   }
   else{
      userData = e.target.value;
   }
    this.setState({ [e.target.name]: userData });
  }
  handleChangeRadio = (e) => {
  //  backEndAPIs[e.target.value];
    this.setState({ backEndAPIs: backEndAPIs[e.target.value]});
  }
  handleSubmitButton = (e) =>{
    e.preventDefault();

    let clear = () => {
      this.setState({ title: "", userInput: "", numbers: [] })
    }

     let user= this.state.user;

     let title= this.state.title;
     let userInput= this.state.userInput;
     let numbers= this.state.numbers;
      let body = {
        user,
        title,
        listItems: [{ userInput, numbers}],
    }
    let reqData = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    fetch(this.state.backEndAPIs.create, reqData)
      .then(response => {
        
       
        return response.json();
      })
      .then((myJson) => {
        console.log('response.ops', myJson);
        this.submitDataInput(myJson);
        console.log("asssssss",JSON.stringify(myJson));
      });

  }

  submitDataInput(newData){

    this.setState(currentState => {
      let clearedState = {
        title: "", userInput: "", numbers: [],
       data: [...currentState.data]
       }
   //    debugger;
      if (currentState.currentUser === newData.user){
        clearedState.data  = clearedState.data.concat(newData);
      }
      
      return {...clearedState}
    });
    this.setState();
  }

  handleChangeBackEnd(){

   

    // this.setState(currentState => {
    //   currentState.backEnd

    //   return {}
    // });
  }

  hadleChangeUser = (e) =>{
   let name = e.target.value;
   console.log('name', name);
    this.setState({ currentUser: name });
  }
  
  render() {
    return (
      <div className="App">
      <menu>filter data from certain users 
    
        <Selection changeRadio={this.handleChangeRadio} changeUser={this.hadleChangeUser} usersList={this.state.usersList}></Selection>
        
      </menu>
        <div>So let me get this straight... the song was originally a Danish pop song by Lis Soreson and then Ednaswap made a more grungy cover with original english lyrics and then Natalie Imbrugila made the cover in the original pop style with the lyrics from Ednaswap.</div>
        <DataDisplay data={this.state.data}>count number of total data here</DataDisplay>
        <UserInput title={this.state.title} userInput={this.state.userInput} numbers={this.state.numbers} changeInput={this.handleChangeInput} submit={this.handleSubmitButton}/>
        <ButtonCustom clickEvent={this.handleClearInput} type={"cancel-button"}>Clear</ButtonCustom>

     
        <div>

        <div className="name-container">
            <input type="text" value={this.state.user} onChange={this.handleChangeInput} name="user"/>
            <button >Clear Name</button>
        </div>
     
        </div>
    
      </div>
    );
  }

}

export default App;



