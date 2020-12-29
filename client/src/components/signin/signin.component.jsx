import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";
import "./signin.styles.css";
const SignIn = ({ user, setUser, history }) => {
  return (
    <div className="sign-in">
      <div className="form">
        <h1>SIGN IN</h1>
        <span style={{ marginRight: "40px" }}>Email</span>
        <input
          type="email"
          name="email"
          onChange={(e) => {
            setUser({ ...user, [e.target.name]: e.target.value });
          }}
        />
        <br />
        Password
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setUser({ ...user, [e.target.name]: e.target.value });
          }}
        />
        <br />
        <button
          onClick={() => {
            axios
              .post("http://localhost:5000/api/login", { user })
              .then((res) => {
                setUser(res.data);

                history.push("/" + res.data._id);
              });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default withRouter(SignIn);
