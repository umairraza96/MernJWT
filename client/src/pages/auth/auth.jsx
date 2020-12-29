import React from "react";
import SignIn from "../../components/signin/signin.component";
import SignUp from "../../components/signup/signup";
import "./auth.styles.css";

const AuthPage = ({ user, setUser }) => {
  return (
    <div className="auth-page">
      <SignUp user={user} setUser={setUser} />
      <SignIn user={user} setUser={setUser} />
    </div>
  );
};

export default AuthPage;
