// authentication with higher order component 
// https://medium.com/@romanchvalbo/how-i-set-up-react-and-node-with-json-web-token-for-authentication-259ec1a90352
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import DataDisplay from './container/datadisplay/datadisplay';
import ButtonCustom from './sharedcomponents/ButtonCustom/ButtonCustom';
import SubjectInput from './container/SubjectInput/SubjectInput';
import RadioForm from './sharedcomponents/RadioForm/RadioForm';
import SubjectSelect from './sharedcomponents/SubjectSelect/SubjectSelect';
import Selection from './container/Selection/Selection';
import Modal from './sharedcomponents/Modal/Modal';
import {BACK_END_API} from './helper/helper';
import LogIn from './container/Login/Index';
import authMethods from './helper/authMrthods';


class App extends Component {
// REFACTOR MAKE CONTROLED COMPONENT LOCAL AN CHANGE SUBMIT TO ACCOUNT FOR THIS
  constructor() {
    super();
      this.state = {

        data : [
         
      ],
      // need log in page subject authentication and authorization
        subject: "default",
        backEnd: "mdb",
        currentBackEnd: "file",
        subjectsList: [],
        currentSubject: "default",
        isShowModal: false,
        dataForEdit: "",
        error: null,
    }
    this.authMethods = new authMethods();

    this.submitDataInput = this.submitDataInput.bind(this); 
    this.delData = this.delData.bind(this);
  }

  componentDidMount(){
    this.getSubjectsAndData();
  }

  getSubjectsAndData() {
    Promise.all([this.showDataToDisplay(), this.showSubjects(), this]).then(function ([data, subjects , self]) {
      if (subjects.error){
        self.setState({ error: subjects.error });
        subjects = [];
      }

      self.setState({ data: data, subjectsList: subjects });
    });
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.currentBackEnd !== this.state.currentBackEnd){
      this.getSubjectsAndData();
    }

    if(prevState.currentSubject !== this.state.currentSubject){
      Promise.resolve(this.showDataToDisplay()).then( data => {
        this.setState({ data });
      }) 
    }
  }

  showSubjects = () => {
 
    const authFeth = () =>{
      let url = BACK_END_API[this.state.currentBackEnd].view;
    return  this.authMethods.fetch(url);
    }


    let manualFetch = () =>{
      let manualToken = this.authMethods.getToken();
      let headers = { Authorization: `Bearer ${manualToken}` }

      let url = BACK_END_API[this.state.currentBackEnd].view;
      let reqData = {
        method: "GET",
       headers
      }
      //, reqData
      return fetch(url, reqData)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          return myJson;

        });
    }
   return manualFetch();
  // return authFeth();
 
  }

  showDataToDisplay = () =>{
    if (this.state.currentSubject === ""){
      return [];
    }
    let subjectUrl = `${BACK_END_API[this.state.currentBackEnd].view}/${this.state.currentSubject}`
  //  subjectUrl = "http://localhost:5000/" + subjectUrl
   let a = fetch(subjectUrl)
      .then(function (response) {  
        if (response.status >= 200 && response.status < 300) {
          // console.log('response', response);
          return response.json();
        } else {
  
          return [];
        }
        //return response.json();
      },err =>{
                console.log("err", err);
        return null;
      })
      .then(function (myJson) {
        return myJson;

      })

    return a;
    
  }
  
  async delData(index)  {
   let id =  this.state.data[index]._id;
    let url = `${BACK_END_API[this.state.currentBackEnd].delete}/${id}`;
    this.setState(currentState => {
      let data = [...currentState.data];

      data.splice(index, 1);
 
      return { data }
    });
    const rawResponse = await fetch(url);
  }

  editData = (event,index) =>{
    let selectedData = this.state.data[index];
    this.setState({ dataForEdit: selectedData, });
    this.toggleModal();
  }

  toggleModal = (e) => {
    if(e == null){
      this.setState({isShowModal: true} );
    }
    else if (e.target.className === e.currentTarget.className){
        this.setState({ isShowModal: false });
    }
 
    
   
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

    })();
  }

  handleChangeInput = (e) =>{
    var subjectData
    if (e.target.name === "numbers"){
      subjectData =  ("" + e.target.value).split('').map(Number) 
   }
   else{
      subjectData = e.target.value;
   }
    this.setState({ [e.target.name]: subjectData });
  }

  //handleChangeBackEnd
  handleChangeRadio = (e) => {
    this.setState({currentBackEnd:e.target.value});
  }

  handleSubmitButton = (subjectData, editId = "") =>{
    let url = BACK_END_API[this.state.currentBackEnd].create;
    let { title, subjectInput, numbers} = subjectData;
    let subject = this.state.subject;
    let body = {
      subject,
      title,
      listItems: [{ numbers }, { subjectInput }],
    }
    if (editId !== "") {
     body._id = editId;
      body.subject = this.state.currentSubject;
      url = BACK_END_API[this.state.currentBackEnd].update;

    }

    let reqData = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    fetch(url, reqData)
      .then(response => {
        return response.json();
      })
      .then((myJson) => {
        this.submitDataInput(myJson);
      });
  }

  submitDataInput(newData){

    this.setState(currentState => {
      let clearedState = {
        
        data: [...currentState.data]
      }
      let subjectsList = [...currentState.subjectsList];
      let foundEdit = currentState.data.findIndex(function (element,index) {

   
        return element._id === newData._id

      });

      if (currentState.currentSubject === newData.subject && foundEdit === -1){
        clearedState.data  = clearedState.data.concat(newData);
        
      }
      if (currentState.subjectsList.indexOf(newData.subject) === -1){
        subjectsList = subjectsList.concat(newData.subject);
      }

      if (foundEdit !== -1){
       //let copyData =  [...currentState.data];
        clearedState.data.splice(foundEdit, 1, newData);
        
        //[foundEdit] = newData;
      }
    
      return { ...clearedState, subjectsList}
    });
    
  }


  hadleChangesubject = (e) =>{
   let name = e.target.value;

    this.setState({ currentSubject: name });
  }
     
  render() {
    let error = this.state.error ? <ErrorComponent message={this.state.error}/> : null;
    return (
      <div className="App">

        <Modal submit={this.handleSubmitButton} isShowModal={this.state.isShowModal} toggleModal={this.toggleModal} dataForEdit={this.state.dataForEdit}/>
      <menu>filter data from certain subjects 
         <div>
            <LogIn />
         </div >
        <Selection currentBackEnd={this.state.currentBackEnd} changeRadio={this.handleChangeRadio} changeSubject={this.hadleChangesubject} subjectsList={this.state.subjectsList}></Selection>
          

      </menu>
        <div>So let me get this straight... the song was originally a Danish pop song by Lis Soreson and then Ednaswap made a more grungy cover with original english lyrics and then Natalie Imbrugila made the cover in the original pop style with the lyrics from Ednaswap.</div>
        <DataDisplay delData={this.delData} editData={this.editData} data={this.state.data}>count number of total data here</DataDisplay>
        <SubjectInput submit={this.handleSubmitButton}/>
        <ButtonCustom clickEvent={this.handleClearInput} type={"cancel-button"}>Clear</ButtonCustom>

     
        <div>

        <div className="name-container">
            <input type="text" value={this.state.subject} onChange={this.handleChangeInput} name="subject"/>
            <button >Clear Name</button>
            {error}
        </div>
      
        </div>
      
      </div>
    );
  }

}

function ErrorComponent(props){

  return (
    <div>
      <h1>{props.message}</h1></div>
  )
}

export default App;



