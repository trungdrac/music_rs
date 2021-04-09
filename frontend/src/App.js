import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/homepage/Home";
import PlaylistDetails from "./components/playlist/PlaylistDetails";
import SongDetails from "./components/song/SongDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/song/:id" component={SongDetails} />{" "}
        <Route exact path="/playlist/:id" component={PlaylistDetails} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
      </Router>
    );
  }
}
export default App;
