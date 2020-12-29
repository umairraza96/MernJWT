import "./App.css";
import Header from "./components/header/header";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./pages/auth/auth";
import PostPage from "./pages/post/post";

function App() {
  const [user, setUser] = useState();
  console.log(user);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <AuthPage user={user} setUser={setUser}></AuthPage>
        </Route>
        <Route path="/:userId">
          <PostPage user={user} setUser={setUser}></PostPage>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
