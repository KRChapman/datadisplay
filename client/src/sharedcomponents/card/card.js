import React from 'react';

const Card = (props) => {

 let numbers = props.listitems[0].numbers.map((ele,i) => {
    return <li key={i}>{ele}</li>
  })
  
  return (

    <div className="card">
      <h5>Title: {props.title}</h5>
      <h6>User: {props.user}</h6>
      <ul>
        {numbers}
      </ul>
    </div>
  )
}

export default Card;