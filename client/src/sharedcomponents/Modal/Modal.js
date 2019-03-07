import React from 'react';
import SubjectInput from '../../container/SubjectInput/SubjectInput';

const Modal = (props) => {

 let modalClass = props.isShowModal === true ? "modal" : "modal modal-none"
 ///let modalClass = "";
  let modalContentClass = props.isShowModal === true ? "modal-content animate-modal" : "modal-content"
  return (
    <div className={modalClass} onClick={props.toggleModal}>
      
  
      <div className={modalContentClass}>
        <h5>Edit Data:</h5>
        {
          props.isShowModal === true ? <SubjectInput submit={props.submit} dataForEdit={props.dataForEdit} id={props.dataForEdit._id} /> : null
        }
       
      </div>
    </div>
  )
}

export default Modal;