import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/userAction";
import axios from "axios";
import Validator from "../../helpers/validator";
import { setLikedSongCount, setRecommendation } from "../../actions/songAction";
import { setMyPlaylistCount } from "../../actions/playlistAction";
import toast from "../../helpers/toast";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameMessage: "",
      passwordMessage: "",
    };
  }
  componentDidMount() {
    Validator({
      form: "#login-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [
        Validator.isRequired("#username"),
        Validator.isRequired("#password"),
        Validator.minLength("#username", 4),
        Validator.minLength("#password", 6),
      ],
      onSubmit: (data) => {
        axios
          .post("/user/login", data)
          .then((res) => {
            const user = res.data;
            this.props.setCurrentUser(user);

            function getRecommendation() {
              return axios.get(`/user/${user.userId}/recommend`, {
                headers: {
                  Authorization: `Bearer ${user.userToken}`,
                },
              });
            }
            function getLikedSongCount() {
              return axios.get(`/user/${user.userId}/liked-song/count`, {
                headers: {
                  Authorization: `Bearer ${user.userToken}`,
                },
              });
            }
            function getMyPlaylistCount() {
              return axios.get(`/user/${user.userId}/my-playlist/count`, {
                headers: {
                  Authorization: `Bearer ${user.userToken}`,
                },
              });
            }

            Promise.all([
              getRecommendation(),
              getLikedSongCount(),
              getMyPlaylistCount(),
            ])
              .then((result) => {
                if (result[0].data)
                  this.props.setRecommendation(result[0].data);
                this.props.setLikedSongCount(result[1].data);
                this.props.setMyPlaylistCount(result[2].data);
              })
              .catch(console.log);
          })
          .then(() => {
            const nextPath = this.props.location.state
              ? this.props.location.state.prevPath
              : "/";
            this.props.history.replace(nextPath);
            toast({
              title: "Thành công!",
              message: "Bạn đã đăng nhập thành công!",
              type: "success",
            });
          })
          .catch((error) => {
            const errorData = error.response.data;
            if (errorData.field === "username")
              this.setState({ usernameMessage: errorData.message });
            if (errorData.field === "password")
              this.setState({ passwordMessage: errorData.message });
          });
      },
    });
  }

  render() {
    return (
      <div className="auth">
        <form
          action="true"
          method="POST"
          className="form box-shadow"
          id="login-form"
        >
          <div className="d-flex align-items-center justify-content-around">
            <h3 className="heading">Đăng nhập</h3>
            <Link to="/">
              <img src={"/images/logos/logo.svg"} alt="logo-app" />
            </Link>
          </div>
          <div className="spacer" />
          <div
            className={`form-group ${
              this.state.usernameMessage ? "api-invalid" : ""
            }`}
          >
            <label htmlFor="username" className="form-label">
              Tên đăng nhập
            </label>
            <input
              autoFocus
              id="username"
              name="username"
              type="text"
              placeholder="Nhập tên đăng nhập"
              className="form-control"
              onChange={() => this.setState({ usernameMessage: "" })}
            />
            <span className="form-message" />
            <span className="api-message">{this.state.usernameMessage}</span>
          </div>
          <div
            className={`form-group ${
              this.state.passwordMessage ? "api-invalid" : ""
            }`}
          >
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="form-control"
              onChange={() => this.setState({ passwordMessage: "" })}
            />
            <span className="form-message" />
            <span className="api-message">{this.state.passwordMessage}</span>
          </div>
          <button className="form-submit">Đăng nhập</button>
          <div className="d-flex justify-content-between mt-3">
            <Link to="/forgot-password" className="auth__options text-info">
              Quên mật khẩu?
            </Link>
            <Link to="/register" className="auth__options text-info">
              Đăng ký ngay!
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setLikedSongCount: (count) => dispatch(setLikedSongCount(count)),
  setMyPlaylistCount: (count) => dispatch(setMyPlaylistCount(count)),
  setRecommendation: (songs) => dispatch(setRecommendation(songs)),
});

export default connect(null, mapDispatchToProps)(Login);
