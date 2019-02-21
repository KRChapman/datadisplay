import React from 'react';
import ButtonCustom from '../ButtonCustom/ButtonCustom';

const UserSelect = (props) => {
// ADD IN BUTTONS THaT go with user names
  let buttons = props.usersList.map((ele,i) => {

    return <ButtonCustom type={"user-button"} clickEvent={props.changeUser} key={i} >{ele}</ButtonCustom>
    
  })
  return (
    <div className={"userSelect-container"}>
      {buttons}
    </div>
  )
}

export default UserSelect;