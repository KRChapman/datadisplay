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


const BACK_END_API = {
  mdb: {
    
    create: "/createMDB",
    view: '/viewMDB',
    update: '/updatefile',
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

// { title: "placeholder", subject: "t", listItems: [{ subjectInput: "here", numbers: [1, 2, 3, 4] }], _id: "123" },
// { title: "2placeholder", subject: "2t", listItems: [{ numbers: [1, 2, 3, 4] },{ subjectInput: "2here"], _id: "1234" }

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
        BACK_END_API: BACK_END_API.mdb,
        subjectsList: [],
        currentSubject: "default",
        isShowModal: false,
        dataForEdit: "",
    }

  

  
    this.submitDataInput = this.submitDataInput.bind(this);
    
    this.delData = this.delData.bind(this);
  }
  componentDidMount(){
   //let dataToDisplay =

    Promise.all([this.showDataToDisplay(), this.showSubjects(), this]).then(function ([data, subjects, self]) {
   
      self.setState({ data: data , subjectsList: subjects });
    })

  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.data !== prevState.data){

    }

    if(prevState.currentSubject !== this.state.currentSubject){
      Promise.resolve(this.showDataToDisplay()).then( data => {
        this.setState({ data });
      }) 
    }
  }

  showSubjects = () => {
    let url = this.state.BACK_END_API.view;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        return myJson;

      });
  }

  showDataToDisplay = () =>{
    if (this.state.currentSubject === ""){
      return [];
    }
    let subjectUrl = `${this.state.BACK_END_API.view}/${this.state.currentSubject}`
  
   let a = fetch(subjectUrl)
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
    
  }
  
  // findAndDelete()
  async delData(index)  {
   let id =  this.state.data[index]._id;
   let url = `/delete/${id}`;
    this.setState(currentState => {
      let data = [...currentState.data];

      data.splice(index, 1);
 
      return { data }
    });
    const rawResponse = await fetch(url);
 
    //rawResponse
  }

  editData = (event,index) =>{
    //event.stopPropagation();
    // get index from when subject clickes button 
    // use index to slect the correct data
    let selectedData = this.state.data[index];
  
    // set isShowModal to true

      this.setState({ dataForEdit: selectedData, });
    // pass the selected index data from state.data and pass to modal props
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
  handleChangeRadio = (e) => {
  //  BACK_END_API[e.target.value];
    this.setState({ BACK_END_API: BACK_END_API[e.target.value]});
  }
  handleSubmitButton = (subjectData, editId = "") =>{
    
    let url = this.state.BACK_END_API.create;
  
    let { title, subjectInput, numbers} = subjectData;
    let subject = this.state.subject;

      let body = {
        subject,
        title,
        listItems: [{numbers}, { subjectInput}],

    }
    if (editId !== "") {
     body._id = editId;
      body.subject = this.state.currentSubject;
     url = this.state.BACK_END_API.update;
    //  this.setState({ isShowModal: false });
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
    console.log('newData', newData);
    this.setState(currentState => {
      let clearedState = {
        
        data: [...currentState.data]
      }
      let subjectsList = [...currentState.subjectsList];
      let foundEdit = currentState.data.findIndex(function (element,index) {
          return element._id === newData._id

      });

   //    debugger;
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

  handleChangeBackEnd(){

   

    // this.setState(currentState => {
    //   currentState.backEnd

    //   return {}
    // });
  }

  hadleChangesubject = (e) =>{
   let name = e.target.value;
   console.log('name', name);
    this.setState({ currentSubject: name });
  }
  
  render() {

    return (
      <div className="App">
     
        <Modal submit={this.handleSubmitButton} isShowModal={this.state.isShowModal} toggleModal={this.toggleModal} dataForEdit={this.state.dataForEdit}/>
      <menu>filter data from certain subjects 
    
        <Selection changeRadio={this.handleChangeRadio} changeSubject={this.hadleChangesubject} subjectsList={this.state.subjectsList}></Selection>
        
      </menu>
        <div>So let me get this straight... the song was originally a Danish pop song by Lis Soreson and then Ednaswap made a more grungy cover with original english lyrics and then Natalie Imbrugila made the cover in the original pop style with the lyrics from Ednaswap.</div>
        <DataDisplay delData={this.delData} editData={this.editData} data={this.state.data}>count number of total data here</DataDisplay>
        <SubjectInput submit={this.handleSubmitButton}/>
        <ButtonCustom clickEvent={this.handleClearInput} type={"cancel-button"}>Clear</ButtonCustom>

     
        <div>

        <div className="name-container">
            <input type="text" value={this.state.subject} onChange={this.handleChangeInput} name="subject"/>
            <button >Clear Name</button>
        </div>
     
        </div>
    
      </div>
    );
  }

}

export default App;



