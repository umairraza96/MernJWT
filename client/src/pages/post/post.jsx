import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./post.styles.css";
const PostPage = ({ user, setUser, history }) => {
  const [data, setData] = useState();
  useEffect(() => {
    if (user !== undefined) {
      axios
        .post(
          "http://localhost:5000/api/post",
          { user },
          { headers: { Authorization: "Bearer " + user.token } }
        )
        .then((res) => {
          setData(res.data);
        });
    }
  }, [user]);
  return (
    <div className="post-page">
      <h1>Welcome to Post Page</h1>
      {data !== undefined ? (
        <div>
          <h1>{data.newUser.email}</h1>
          <h2>{data.message}</h2>
        </div>
      ) : (
        <h1>Please Login First</h1>
      )}
    </div>
  );
};

export default withRouter(PostPage);
