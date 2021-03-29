import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/homepage/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

class App extends Component {
  render() {
    return (
      <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
      </Router>
    );
  }
}

export default App;
