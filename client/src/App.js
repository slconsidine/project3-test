import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Test Home";
import Login from "./components/Sign-In";


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
