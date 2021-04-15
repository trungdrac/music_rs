import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import { setAreas } from "./actions/areaAction";
import callAPI from "./helpers/callAPI";
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
    callAPI("GET", "/area")
      .then((res) => {
        this.props.setAreas(res.data);
      })
      .then(() => this.setState({ isLoading: false }));
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
        <div className="wrapper">
          <Sidebar />
          <div className="content">
            <Header />
            <div className="main-content container-fruit">
              <Switch>
                <Route exact path="/search" component={Search} />
                <Route exact path="/song/detail/:id" component={SongDetail} />
                <Route exact path="/song/:slug" component={Songs} />
                <Route exact path="/song" component={Songs} />
                <Route
                  exact
                  path="/playlist/detail/:id"
                  component={PlaylistDetail}
                />
                <Route exact path="/playlist/:slug" component={Playlists} />
                <Route exact path="/playlist" component={Playlists} />
                <Route
                  exact
                  path="/artist/detail/:id"
                  component={ArtistDetail}
                />
                <Route exact path="/artist/:slug" component={Playlists} />
                <Route exact path="/artist" component={Playlists} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/" component={Home} />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            </div>
            <Player />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  areas: state.area,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAreas: (areas) => dispatch(setAreas(areas)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
