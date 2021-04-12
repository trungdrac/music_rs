import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ArtistDetail from "./components/artist/ArtistDetail";
import Player from "./components/general/Player";
import Home from "./components/homepage/Home";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import PlaylistDetail from "./components/playlist/PlaylistDetail";
import SongDetail from "./components/song/SongDetail";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <React.Fragment>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <div className="wrapper">
              <Sidebar />
              <div className="content">
                <Header />
                <div className="main-content container-fruit">
                  <Route exact path="/song/:id" component={SongDetail} />
                  <Route
                    exact
                    path="/playlist/:id"
                    component={PlaylistDetail}
                  />
                  <Route exact path="/artist/:id" component={ArtistDetail} />
                  <Route exact path="/" component={Home} />
                </div>
                <Player />
              </div>
            </div>
          </React.Fragment>
        </Switch>
      </Router>
    );
  }
}
export default App;
