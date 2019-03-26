import React, { Component } from 'react';
import RadioForm from '../../sharedcomponents/RadioForm/RadioForm';
import SubjectSelect from '../../sharedcomponents/SubjectSelect/SubjectSelect';


class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 168,
    }
  }
  changeSubjectWidth(subjectsList) {
    const firstColumn = 1;
    const btnWidth = 110;
    const numberOfColumns = subjectsList.length / 2 - firstColumn;
    const selectionWidth = subjectsList.length <= 2 ? btnWidth : Math.ceil(numberOfColumns) * btnWidth;
    const width = selectionWidth + this.state.width + "px";
    return width;
  }
  render() { 


    const { changeRadio, changeSubject, subjectsList} = this.props;
    let width = this.changeSubjectWidth(subjectsList);
 
    return ( 
      <div className="selection-container" style={{width: width}}>
        <RadioForm currentBackEnd={this.props.currentBackEnd} changeRadio={changeRadio} />
        <SubjectSelect changeSubject={changeSubject} subjectList={subjectsList} />
      </div>
     )
  }


}
 
export default Selection;


  
