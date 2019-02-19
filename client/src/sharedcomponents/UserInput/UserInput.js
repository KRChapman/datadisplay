import React from 'react';
import ButtonCustom from '../ButtonCustom/ButtonCustom';

const UserInput = (props) => {

  return (
   <React.Fragment>
     <form >
        <label htmlFor="title">title</label>
        <input type="text" name="title" onChange={props.changeInput} value={props.title}/>
        <label htmlFor="userInput">User Input</label>
        <input type="text" name="userInput" onChange={props.changeInput} value={props.userInput}/>
        < SelectNumbers selectNumber={props.changeInput} numbers={props.numbers}/>
        <ButtonCustom clickEvent={props.submit} type={"confirm-button"}>Submit</ButtonCustom>
    
     </form>
  
   </React.Fragment>
  )
}

//  

const SelectNumbers = (props) => {

  let options = [<option value="" key={0}>Select:</option>];
  for (let i = 1; i <= 10; i++) {
    let option = <option value={`${i * 122}`} key={i}>{i * 122}</option>
    options.push(option);
    
  }
  let numbers = props.numbers.join('');
  // numbers = "";
  return (
    <React.Fragment>
      <select name="numbers" onChange={props.selectNumber} defaultValue={numbers}>
        {options}
      </select>
    </React.Fragment>
  
  )
}


export default UserInput;