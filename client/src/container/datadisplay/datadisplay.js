
import React, { Component } from 'react';
import Card from '../../sharedcomponents/card/card';

  //red < 488 blue > 488 <= 854   green > 854 
const borderColors = {red:"red", blue: "blue", green: "green"}

class DataDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { borderColors: [] }
  }

  componentDidUpdate(prevProps, prevState){

    if (prevProps.data != this.props.data){
      let data = this.props.data;

      let borderColors = data.map(ele => {

        let number = parseInt(ele.listItems[0].numbers.join(''));

        return number;
      })

      // this.changeBorderColor(borderColors.blue);
      this.setBorderColor(borderColors);
    }



  }

  setBorderColor(numbers){
    //red < 488 blue > 488 <= 854   green > 854 
    const colorChoice = { red: "red", blue: "blue", green: "green", default: "#000000" };
    let colors = [];
    numbers.forEach(element => {
      switch (true) {
        case (element < 488):
          colors.push(colorChoice.red)
          break;
        case (854 >= element && element >= 488):
          colors.push(colorChoice.blue)
          break;
        
        case (element > 854):
          colors.push(colorChoice.green)
          break;

        default: 
          colors.push(colorChoice.default)
          break;
      }
      
    });
    this.setState({ borderColors: colors  });

  }

  changeBorderColor(borderColor) {
    this.setState({ borderColor  });
  }
  render() { 

    let {borderColors} = this.state;
    let cards = this.props.data.length !== 0 ? this.props.data.map((ele, i) => {

      return <Card delData={this.props.delData} editData={this.props.editData} index={i} borderColor={borderColors[i]} title={ele.title} subject={ele.subject} listitems={ele.listItems} key={ele._id} />;
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