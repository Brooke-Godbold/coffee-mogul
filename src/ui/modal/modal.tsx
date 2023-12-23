"use client";

import React, {
  ReactElement,
  SyntheticEvent,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { HiX } from "react-icons/hi";

import styles from "./modal.module.css";

const ModalContext = createContext({
  open: (val: string) => {},
  close: () => {},
  openName: "",
});

interface ModalProps {
  children: React.ReactNode;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState("");

  const close = () => {
    setOpenName("");
  };
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  children: ReactElement;
  opens: string;
}

function Open({ children, opens: openWindowName }: OpenProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: (e: SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      open(openWindowName);
    },
  });
}

interface WindowProps {
  children: ReactElement;
  name: string;
}

function Window({ children, name }: WindowProps) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.modalCloseButton} onClick={close}>
          <HiX />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
