import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUpUserStart } from "../../redux/User/user.actions";
import { useHistory, Link } from "react-router-dom";
import FormInput from "../UI/FormInput";
import Button from "../UI/Button";
import AuthWrapper from "../UI/AuthWrapper";
import "./styles.scss";

function SignUp() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userError = useSelector((state) => state.user.userError);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser, history]);
  useEffect(() => {
    if (Array.isArray(userError) && userError.length > 0) {
      setError(userError);
    }
  }, [userError]);
  const resetForm = () => {
    setDisplayName("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
  };
  const nameChangeHandler = (event) => {
    setDisplayName(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword,
      })
    );
  };
  return (
    <AuthWrapper headline="Registration">
      <div className="formWrap">
        {error.length > 0 && (
          <ul>
            {error.map((err, i) => {
              return <li key={i}>{err}</li>;
            })}
          </ul>
        )}
        <form onSubmit={submitHandler}>
          <FormInput
            handleChange={nameChangeHandler}
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
          />
          <FormInput
            handleChange={emailChangeHandler}
            type="email"
            name="email"
            value={email}
            placeholder="Email"
          />
          <FormInput
            handleChange={passwordChangeHandler}
            type="password"
            name="password"
            value={password}
            placeholder="Password"
          />
          <FormInput
            handleChange={confirmPasswordChangeHandler}
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
          />
          <Button type="submit">Register</Button>
        </form>
        <div className="links">
          <Link to="/login">LogIn</Link>
          {` | `}
          <Link to="/recovery">Reset Password</Link>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default SignUp;
