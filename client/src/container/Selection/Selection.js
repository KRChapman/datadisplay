import React, { Component } from 'react';
import RadioForm from '../../sharedcomponents/RadioForm/RadioForm';
import UserSelect from '../../sharedcomponents/UserSelect/UserSelect';


class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 168,
    }
  }
  render() { 

  
    const { changeRadio, changeUser, usersList} = this.props;
    let numberOfColumns = usersList.length / 2 - 1;
    /// 2 - 1;
    let selectionWidth = usersList.length <= 2 ? 110 : Math.ceil(numberOfColumns)  * 110;
    let width = selectionWidth + this.state.width + "px";
    return ( 
      <div className="selection-container" style={{width: width}}>
        <RadioForm changeRadio={changeRadio} />
        <UserSelect changeUser={changeUser} usersList={usersList} />
      </div>
     )
  }
}
 
export default Selection;


  