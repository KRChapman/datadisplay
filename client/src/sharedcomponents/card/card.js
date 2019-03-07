import React from 'react';

const Card = (props) => {

 let numbers = props.listitems[0].numbers.map((ele,i) => {
   return <li  key={i}>{ele}</li>
  })
  
  return (

    <div className="card" style={{ borderColor: props.borderColor }}>
      <h5>Title: {props.title}</h5>
      <h6>Subject: {props.subject}</h6>
      <ul>
        {numbers}
      </ul>
      <button onClick={ (event) => props.delData(props.index)}>delete</button>
      <button onClick={(event) => props.editData(event,props.index)}>edit</button>
    </div>
  )
}

export default Card;