import React from 'react';
import ButtonCustom from '../ButtonCustom/ButtonCustom';

const SubjectSelect = (props) => {
// ADD IN BUTTONS THaT go with subject names
  let buttons = props.subjectList.map((ele,i) => {

    return <ButtonCustom type={"subject-button"} clickEvent={props.changeSubject} key={i} >{ele}</ButtonCustom>
    
  })
  return (
    <div className={"subjectSelect-container"}>
      {buttons}
    </div>
  )
}

export default SubjectSelect;