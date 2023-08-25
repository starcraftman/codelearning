import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

interface BackdropProps{
  onClose: () => void;
};
interface ModalOverlayProps{
  children: string | number | React.ReactNode | React.ReactNode[];
};
interface ModalProps{
  children: string | number | React.ReactNode | React.ReactNode[];
  onClose: () => void;
};

const Backdrop = (props: BackdropProps) => {
  return (
    <div className={styles.backdrop} onClick={props.onClose}>
    </div>
  );
}

const ModalOverlay = (props: ModalOverlayProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  );
}
const portalElement = document.getElementById("overlays") as HTMLElement;
const Modal = (props: ModalProps) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </React.Fragment>
  );
};

export default Modal;
