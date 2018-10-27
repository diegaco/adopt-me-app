import React, { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

class Modal extends Component {
  private el = document.createElement("div");

  public componentDidMount() {
    if (modalRoot) {
      modalRoot.appendChild(this.el);
    }
  }

  public omponentWillUnmount() {
    // This method is almost always for clearing memory
    // removing event listeners, removing extraneous document stuff,
    // anything that's gonna leak memory
    if (modalRoot) {
      modalRoot.removeChild(this.el);
    }
  }

  public render() {
    return createPortal(this.props.children, this.el);
  }
}

export default Modal;
