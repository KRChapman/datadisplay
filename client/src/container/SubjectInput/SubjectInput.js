
import ButtonCustom from '../../sharedcomponents/ButtonCustom/ButtonCustom';


import React, { Component } from 'react';
  


  
class SubjectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...seedState(props)
      }

      function seedState(props){
       let state = {
         title: "",
         subjectInput: "",
         numbers: [],
         editId: "",
       }

       if(props.id){
       state =   {    title: props.dataForEdit.title,
        subjectInput: props.dataForEdit.listItems[1].subjectInput,
        numbers: props.dataForEdit.listItems[0].numbers,
        editId: props.id,}
       }
       return state;
      }

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  // static getDerivedStateFromProps(props, state, prevProps) {
 
  //   if (props.id && (props.id != state.editId)) {
  //     console.log('state', state);
  //     return {
  //       title: props.dataForEdit.title,
  //       subjectInput: props.dataForEdit.listItems[1].subjectInput,
  //       numbers: props.dataForEdit.listItems[0].numbers,
  //       editId: props.id,

  //     };
  //   }
  
  //   return null;
  // }


  handleChangeInput(e) {
    var subjectData
    if (e.target.name === "numbers") {
      subjectData = ("" + e.target.value).split('').map(Number)
    }
    else {
      subjectData = e.target.value;
    }
    this.setState({ [e.target.name]: subjectData });
  }
  submitForm = (e) =>{
    e.preventDefault();
    //e.stopPropagation();
    let subjectData = {
      title: this.state.title,
      subjectInput: this.state.subjectInput,
      numbers: this.state.numbers }
    let id = this.state.editId
    let clear = () => {
    
      this.setState({ title: "", subjectInput: "", numbers: [], editId: "" })
    }
    //clear();
   // debugger;
    this.setState({ title: "", subjectInput: "", numbers: [], editId: ""}, () =>

     this.props.submit(subjectData, id)
      );
//    console.log('this.state', this.state)
      // this.setState(currentState => {


      //   return { title: "", subjectInput: "", numbers: [], editId: "" }
      // });
    console.log("this.stateLastLASTLAST", this.state)
    // console.log('editId', id);

  }
  render() { 
    return (  

        <div>
          <form >
            <label htmlFor="title">title</label>
            <input type="text" name="title" onChange={this.handleChangeInput} value={this.state.title} />
            <label htmlFor="subjectInput">subject Input</label>
            <input type="text" name="subjectInput" onChange={this.handleChangeInput} value={this.state.subjectInput} />
            < SelectNumbers selectNumber={this.handleChangeInput} numbers={this.state.numbers} />
            <ButtonCustom clickEvent={this.submitForm} type={"confirm-button"}>Submit</ButtonCustom>

          </form>
        </div>
  

   
    )
  }
}
 


//  

const SelectNumbers = (props) => {

  let options = [<option value="" key={0}>Select:</option>];
  for (let i = 1; i <= 10; i++) {
    let option = <option value={`${i * 122}`} key={i}>{i * 122}</option>
    options.push(option);
    
  }
  let start = props.numbers.length === 0 ? "" : props.numbers.join('');


  return (
    <React.Fragment>
      <select name="numbers" onChange={props.selectNumber} value={start}>
        {options}
      </select>
    </React.Fragment>
  
  )
}


export default SubjectInput;