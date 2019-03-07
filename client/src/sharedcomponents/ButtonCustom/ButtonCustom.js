import React from 'react';

const ButtonCustom = (props) => {

  // props.submit();
  let btnType = props.type ? props.type : "";
  let btnClass = `base-btn ${btnType}`
  return (
    <button onClick={ props.clickEvent} className={btnClass} value={props.children}>{props.children}</button>
  )
}

export default ButtonCustom;