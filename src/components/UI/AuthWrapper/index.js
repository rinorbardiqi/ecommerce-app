import React from "react";
import "./styles.scss";
function AuthWrapper(props) {
  const { headline, children } = props;
  return (
    <div className="authWrapper">
      <div className="wrap">
        {headline && <h2>{headline}</h2>}
        <div className="children">
            {children}
        </div>
      </div>
    </div>
  );
}

export default AuthWrapper;
