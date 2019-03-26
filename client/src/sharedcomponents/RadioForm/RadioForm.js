import React from 'react';
import {BACK_END_API} from './../../helper/helper'
const Input = (props) => {
  return (
    <React.Fragment>
      <input disabled={props.disabled} defaultChecked={props.checked} type="radio" name="back-end" onClick={props.changeRadio} value={props.value}/> {props.value} < br />
    </React.Fragment>

  )
}

const RadioForm = (props) => {
  const apiKeys =  Object.keys(BACK_END_API);
  const radioInputs = apiKeys.map((ele) => {
    
    let checked = props.currentBackEnd === ele ? "checked" : null;
    let disabled = Object.keys(BACK_END_API[ele]).length === 0 ? "disabled" : null;
    return <Input key={ele} value={ele} disabled={disabled} checked={checked} changeRadio={props.changeRadio} />
  });
  return (
    <form action="">
      {radioInputs}
    </form>
  )
}



export default RadioForm;
