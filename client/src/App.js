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
    axios
      .get("/area")
      .then((res) => {
        this.props.setAreas(res.data);
      })
      .then(() => this.setState({ isLoading: false }))
      .catch(console.error);
  }

  render() {
    const { user } = this.props;
    //display loader
    if (this.state.isLoading) return <Loading />;
    return (
      <Router>
        <div className="wrapper">
          <Sidebar />
          <div className="content">
            <Header />
            <div className="main-content container-fruit">
              <Switch>
                <Route exact path="/search" component={Search} />
                <Route
                  exact
                  path="/song/detail/:id"
                  render={(props) => (
                    <SongDetail key={props.match.params.id} {...props} />
                  )}
                />
                <Route exact path="/song/:area/:category" component={Songs} />

                <Route
                  exact
                  path="/playlist/detail/:id"
                  render={(props) => (
                    <PlaylistDetail key={props.match.params.id} {...props} />
                  )}
                />
                <Route exact path="/playlist/:area" component={Playlists} />
                <Route
                  exact
                  path="/artist/detail/:id"
                  render={(props) => (
                    <ArtistDetail key={props.match.params.id} {...props} />
                  )}
                />
                <Route exact path="/artist/:area" component={Artists} />
                {!user.userToken ? (
                  <Route exact path="/login" component={Login} />
                ) : null}
                {!user.userToken ? (
                  <Route exact path="/register" component={Register} />
                ) : null}
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

const mapDispatchToProps = (dispatch) => {
  return {
    setAreas: (areas) => dispatch(setAreas(areas)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
