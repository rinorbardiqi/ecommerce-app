import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/User/user.actions";

import "./styles.scss";
import { Link, useHistory } from "react-router-dom";
import Button from "../UI/Button";
import FormInput from "../UI/FormInput";
import AuthWrapper from "../UI/AuthWrapper";

function SignIn(props) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser, history]);
  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };
  const resetForm = () => {
    setPassword("");
    setEmail("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  return (
    <AuthWrapper headline="login">
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={emailHandler}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={passwordHandler}
          />
          <Button type="submit">Sign In</Button>
          <div className="socialSignIn">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
            </div>
          </div>
          <div className="links">
            <Link to="/registration">Register</Link>
            {` | `}
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
