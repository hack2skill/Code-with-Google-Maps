import React from "react";
import styles from "./Input.module.css";

const InputControl = (props) => {
  return (
    <>
      {props.label && <label>{props.label}</label>}
       <input type="text" {...props} />
    </>
  );
};

export default InputControl;
