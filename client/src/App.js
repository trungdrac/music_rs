import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ArtistDetail from "./components/artist/ArtistDetail";
import Player from "./components/general/Player";
import Home from "./components/home/Home";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import PlaylistDetail from "./components/playlist/PlaylistDetail";
import Playlists from "./components/playlist/Playlists";
import Search from "./components/search/Search";
import SongDetail from "./components/song/SongDetail";
import Songs from "./components/song/Songs";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    //display loader
    if (this.state.isLoading) {
      return (
        <div className="loading">
          <div className="loader">
            <div className="eq">
              <span className="eq-bar eq-bar--1" />
              <span className="eq-bar eq-bar--2" />
              <span className="eq-bar eq-bar--3" />
              <span className="eq-bar eq-bar--4" />
              <span className="eq-bar eq-bar--5" />
              <span className="eq-bar eq-bar--6" />
            </div>
            <span className="loader__text">Đang tải dữ liệu</span>
          </div>
        </div>
      );
    }

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
                  <Route exact path="/search" component={Search} />
                  <Route exact path="/song/:slug" component={Songs} />
                  <Route exact path="/song/detail/:id" component={SongDetail} />
                  <Route exact path="/playlist/:slug" component={Playlists} />
                  <Route
                    exact
                    path="/playlist/detail/:id"
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
