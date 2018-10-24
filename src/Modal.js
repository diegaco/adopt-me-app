import React, { Component } from "react";
import { createPortal } from "react-dom";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.modalRoot = document.getElementById("modal");
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // This method is almost always for clearing memory
    // removing event listeners, removing extraneous document stuff,
    // anything that's gonna leak memory
    this.modalRoot.removeChild(this.el);
  }

  render() {
    return createPortal(this.props.children, this.el);
  }
}

export default Modal;
