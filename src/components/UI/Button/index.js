import React from "react";
import "./styles.scss";

function Button({ children, className = "", ...otherProps }) {
  const classes = "btn " + className;
  return (
    <button {...otherProps} className={classes}>
      {children}
    </button>
  );
}

export default Button;
