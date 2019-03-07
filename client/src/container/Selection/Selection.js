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
  render() { 

  
    const { changeRadio, changeSubject, subjectsList} = this.props;
    let numberOfColumns = subjectsList.length / 2 - 1;
    /// 2 - 1;
    let selectionWidth = subjectsList.length <= 2 ? 110 : Math.ceil(numberOfColumns)  * 110;
    let width = selectionWidth + this.state.width + "px";
    return ( 
      <div className="selection-container" style={{width: width}}>
        <RadioForm changeRadio={changeRadio} />
        <SubjectSelect changeSubject={changeSubject} subjectList={subjectsList} />
      </div>
     )
  }
}
 
export default Selection;


  
