import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import "./styles.scss";
import FormInput from "../UI/FormInput";
import AuthWrapper from "../UI/AuthWrapper";
import Button from "../UI/Button";
import {
  resetUserState,
  resetPasswordStart,
} from "../../redux/User/user.actions";
function EmailPassword() {
  const userError = useSelector((state) => state.user.userError);
  const resetPasswordSuccess = useSelector(
    (state) => state.user.resetPasswordSuccess
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push("/login");
    }
  }, [resetPasswordSuccess, history, dispatch]);
  useEffect(() => {
    if (Array.isArray(userError) && userError.length > 0) {
      setErrors(userError);
    }
  }, [userError, history]);
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(resetPasswordStart({ email }));
  };
  return (
    <AuthWrapper headline="Email Password">
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}
        <form onSubmit={submitHandler}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={emailHandler}
          />
          <Button type="Submit"> Recovery</Button>
        </form>
        <div className="links">
          <Link to="/login">LogIn</Link>
          {` | `}
          <Link to="/registration">Register</Link>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default EmailPassword;
