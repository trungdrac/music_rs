import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/homepage/Home";
import PlaylistDetail from "./components/playlist/PlaylistDetail";
import SongDetail from "./components/song/SongDetail";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/song/:id" component={SongDetail} />
        <Route exact path="/playlist/:id" component={PlaylistDetail} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
      </Router>
    );
  }
}
export default App;
