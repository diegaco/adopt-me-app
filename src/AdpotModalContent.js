import React from "react";

const AdpotModalContent = props => (
  <React.Fragment>
    <h1>Would you like to adopt {props.name}</h1>
    <div className="buttons">
      <button onClick={props.toggleModal}>Yes!!</button>
      <button onClick={props.toggleModal}>Defineteñy Yes!!</button>
    </div>
  </React.Fragment>
);

export default AdpotModalContent;
