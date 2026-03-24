import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    userId: "sachin",
    password: "Sample@123",
  });

  const onChange = (name, e) => {
    setState((s) => ({ ...s, [name]: e.target.value }));
  };

  const onLoginSubmit = async () => {
    try {
      const res = await axios.post(BASE_URL + `/login/${state.userId}`, null, {
        headers: { password: state.password },
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      if (res?.data) {
        navigate("/");
      }
    } catch (err) {
      console.log("Login Failed ", err);
    }
  };

  return (
    <div className="justify-items-center">
      <div className="card card-border bg-base-300 w-96 m-20">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">User ID</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={state.userId}
                onChange={(e) => onChange("userId", e)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={state.password}
                onChange={(e) => onChange("password", e)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={onLoginSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
