import React from "react";
import { withRouter } from "react-router-dom";
import "./header.styles.css";
const Header = ({ history }) => {
  return (
    <div className="header">
      <h1
        onClick={() => {
          history.push("/");
        }}
        style={{ cursor: "pointer" }}
      >
        EASY TOUR GUIDE
      </h1>
    </div>
  );
};

export default withRouter(Header);
