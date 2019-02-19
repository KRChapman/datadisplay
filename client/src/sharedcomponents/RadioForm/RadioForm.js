import React from 'react';

const RadioForm = (props) => {

  return (
    <form action="">
      <input type="radio" name="gender" onClick={props.changeRadio} value="mdb" /> mdb<br/>
      <input type="radio" name="gender" onClick={props.changeRadio} value="file" /> file<br/>
      <input type="radio" name="gender" onClick={props.changeRadio} value="pg" /> pg
    </form>
  )
}

export default RadioForm;
