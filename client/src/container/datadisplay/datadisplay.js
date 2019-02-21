
import React, { Component } from 'react';
import Card from '../../sharedcomponents/card/card';
  
class DataDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { borderColor: "red" }
  }
  render() { 

    let cards = this.props.data.length !== 0 ? this.props.data.map((ele, i) => {

      return <Card title={ele.title} user={ele.user} listitems={ele.listItems} key={ele._id} />;
    })
      :
      <div style={{ height: "100px" }}>No DATA</div>;
    return ( 
      <div>
        <div className="cards-container">
          {cards}
        </div>
        {this.props.children}
      </div>
     )
  }
}
 
export default DataDisplay;