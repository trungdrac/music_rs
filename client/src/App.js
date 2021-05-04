import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import { setAreas } from "./actions/areaAction";
import axios from "axios";
import ArtistDetail from "./components/artist/ArtistDetail";
import Artists from "./components/artist/Artists";
import Player from "./components/general/Player";
import Loading from "./components/general/Loading";
import Home from "./components/home/Home";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import PlaylistDetail from "./components/playlist/PlaylistDetail";
import Playlists from "./components/playlist/Playlists";
import SongDetail from "./components/song/SongDetail";
import Songs from "./components/song/Songs";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import SearchResult from "./components/search/SearchResult";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    axios
      .get("/area")
      .then((res) => {
        this.props.setAreas(res.data);
      })
      .then(() => this.setState({ isLoading: false }))
      .catch((error) =>
        alert(
          `Lỗi! ${
            error.response.data.message ? error.response.data.message : ""
          }`
        )
      );
  }

  render() {
    if (this.state.isLoading) return <Loading />;

    const { user } = this.props;

    return (
      <Router>
        <div className="wrapper">
          <Sidebar />
          <div className="content">
            <Header />
            <div className="main-content container-fruit">
              <Switch>
                <Route
                  exact
                  path="/search/:type"
                  render={(props) => (
                    <SearchResult
                      key={props.history.location.search}
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/song/detail/:id"
                  render={(props) => (
                    <SongDetail key={props.match.params.id} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/song/:area/:category"
                  render={(props) => (
                    <Songs key={props.history.location.search} {...props} />
                  )}
                />

                <Route
                  exact
                  path="/playlist/detail/:id"
                  render={(props) => (
                    <PlaylistDetail key={props.match.params.id} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/playlist/:area"
                  render={(props) => (
                    <Playlists key={props.history.location.search} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/artist/detail/:id"
                  render={(props) => (
                    <ArtistDetail key={props.match.params.id} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/artist/:area"
                  render={(props) => (
                    <Artists key={props.history.location.search} {...props} />
                  )}
                />
                {!user.userToken ? (
                  <Route exact path="/login" component={Login} />
                ) : null}
                {!user.userToken ? (
                  <Route exact path="/register" component={Register} />
                ) : null}
                {!user.userToken ? (
                  <Route
                    exact
                    path="/forgot-password"
                    component={ForgotPassword}
                  />
                ) : null}
                <Route
                  exact
                  path="/reset-password/:token"
                  component={ResetPassword}
                />
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
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setAreas: (areas) => dispatch(setAreas(areas)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
