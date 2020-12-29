import React from "react";
import "./signup.styles.css";
import axios from "axios";
const SignUp = ({ user, setUser }) => {
  return (
    <div className="sign-up">
      <div className="form">
        <h1>SIGN UP</h1>
        <br />
        Email
        <br />
        <input
          type="email"
          name="email"
          onChange={(e) => {
            setUser({ ...user, [e.target.name]: e.target.value });
          }}
        />
        <br />
        Password
        <br />
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
              .post("http://localhost:5000/api/register", { user })
              .then((res) => {
                setUser(res.data);
                console.log(res.data);
              });
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default SignUp;
