import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import { setAreas } from "./actions/areaAction";
import { setChart, setRecommendation } from "./actions/songAction";
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
import Recommendation from "./components/user/Recommendation";
import LikedSong from "./components/user/LikedSong";
import MyPlaylist from "./components/user/MyPlaylist";
import History from "./components/user/History";
import toast from "./helpers/toast";
import cronjob from "./helpers/cronjob";

function PrivateRoute({ component: Component, token, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component key={props.history.location.search} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { prevPath: props.location.pathname },
            }}
          />
        )
      }
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    function getArea() {
      return axios.get("/area");
    }
    function getChart() {
      return axios.get("/song/chart");
    }

    Promise.all([getArea(), getChart()])
      .then((result) => {
        this.props.setAreas(result[0].data);
        this.props.setChart(result[1].data);
      })
      .then(() => this.setState({ isLoading: false }))
      .catch((error) =>
        toast({
          title: "Thất bại!",
          message: `${
            error.response.data.message
              ? error.response.data.message
              : "Có lỗi xảy ra!"
          }`,
          type: "error",
        })
      );
    
    // get recommendation every hour
    cronjob(new Date().setMinutes(0), 3600000, this.getRecommendation);
  }

  getRecommendation = () => {
    const { user } = this.props;
    if (user.userToken)
      axios
        .get(`/user/${user.userId}/recommend`, {
          headers: {
            Authorization: `Bearer ${user.userToken}`,
          },
        })
        .then((result) => {
          if (result.data) this.props.setRecommendation(result.data);
        })
        .catch(() =>
          toast({
            title: "Thất bại!",
            message: "Không thể lấy gợi ý!",
            type: "error",
          })
        );
  };

  render() {
    if (this.state.isLoading) return <Loading />;

    const { user } = this.props;

    return (
      <Router>
        <div className="wrapper">
          <div id="my-toast"></div>
          <Sidebar location={this.props.location} />
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
                <PrivateRoute
                  exact
                  path="/user/recommend"
                  token={user.userToken}
                  component={Recommendation}
                />
                <PrivateRoute
                  exact
                  path="/user/liked-song"
                  token={user.userToken}
                  component={LikedSong}
                />
                <PrivateRoute
                  exact
                  path="/user/my-playlist"
                  token={user.userToken}
                  component={MyPlaylist}
                />
                <PrivateRoute
                  exact
                  path="/user/history"
                  token={user.userToken}
                  component={History}
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
  setChart: (songs) => dispatch(setChart(songs)),
  setRecommendation: (songs) => dispatch(setRecommendation(songs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
