import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/userAction";
import { setSuggestion } from "../../actions/searchAction";
import {
  setLikedSong,
  setLikedSongCount,
  setRecommendation,
} from "../../actions/songAction";
import {
  setMyPlaylist,
  setMyPlaylistCount,
} from "../../actions/playlistAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faSignOutAlt,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import debounce from "../../helpers/debounce";
import axios from "axios";
import toast from "../../helpers/toast";
import handleKeyboardEvent from "../../helpers/handleKeyboardEvent";
import Validator from "../../helpers/validator";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogoutModal: false,
      showProfileModal: false,
      usernameMessage: "",
      emailMessage: "",
      passwordMessage: "",
      update: false,
    };
    this.searchRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.showProfileModal !== this.state.showProfileModal) &
      !this.state.showProfileModal
    )
      this.setState({ update: false });
    if (prevState.update !== this.state.update && this.state.update)
      Validator({
        form: "#update-profile-form",
        formGroupSelector: ".form-group",
        errorSelector: ".form-message",
        rules: [
          Validator.isRequired("#username"),
          Validator.isRequired("#email"),
          Validator.isRequired("#password"),
          Validator.minLength("#username", 4),
          Validator.isEmail("#email"),
          Validator.minLength("#password", 6),
        ],
        onSubmit: (data) => {
          if (!this.state.usernameMessage && !this.state.emailMessage) {
            const { user } = this.props;
            axios
              .post(`/user/${user.userId}/update-profile/`, data, {
                headers: {
                  Authorization: `Bearer ${user.userToken}`,
                },
              })
              .then((res) => {
                const user = res.data;
                this.props.setCurrentUser(user);
                this.setState({ showProfileModal: false });
                toast({
                  title: "Thành công!",
                  message: "Cập nhật tài khoản thành công!",
                  type: "success",
                });
              })
              .catch((error) => {
                const errorData = error.response.data;
                if (errorData.field === "password")
                  this.setState({ passwordMessage: errorData.message });
              });
          }
        },
      });
  }

  checkExisted = (e) => {
    let data = {};
    data[e.target.name] = e.target.value;
    axios
      .post("/user/register/existed", data)
      .then((res) => {
        const result = res.data;
        if (result.field === "username")
          this.setState({ usernameMessage: result.message });
        if (result.field === "email")
          this.setState({ emailMessage: result.message });
      })
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
  };

  suggest = debounce((e) => {
    axios
      .get(`/search?q=${e.target.value}`)
      .then((res) => {
        const suggestion = res.data;
        this.props.setSuggestion(suggestion);
      })
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
  }, 500);

  handleSelect = (e) => {
    const input = this.searchRef.current;
    const selectedNode = e.target.closest(".list-song__item.list-group-item");
    const { type, id } = selectedNode.dataset;
    this.props.history.push(`/${type}/detail/${id}`);
    input.blur();
  };

  search = () => {
    const input = this.searchRef.current;
    this.props.history.push(`/search/song?q=${input.value}`);
    input.blur();
  };

  onEnter = (e) => {
    if (e.key === "Enter") this.search();
  };

  logout = () => {
    this.props.setCurrentUser(null);
    this.props.setRecommendation(null);
    this.props.setLikedSong(null);
    this.props.setLikedSongCount(null);
    this.props.setMyPlaylist(null);
    this.props.setMyPlaylistCount(null);
    this.setState({ showLogoutModal: false });
    this.props.history.push("/");
    toast({
      title: "Thành công!",
      message: "Bạn đã đăng xuất khỏi hệ thống!",
      type: "success",
    });
  };

  render() {
    const { user, suggestion, location } = this.props;

    return (
      <div className="header">
        <div className="header__content">
          <label
            htmlFor="sidebar-checkbox"
            className="header__content--sidebar-icon"
          >
            <FontAwesomeIcon icon={faBars} />
          </label>
          <input
            type="checkbox"
            hidden
            className="sidebar-input"
            id="sidebar-checkbox"
          />
          <label htmlFor="sidebar-checkbox" className="overlay"></label>
          <Sidebar />
          <div className="header__content--search box-shadow">
            <button className="search-icon" onClick={this.search}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm..."
              onChange={this.suggest}
              ref={this.searchRef}
              onKeyPress={this.onEnter}
              onFocus={() =>
                window.removeEventListener("keydown", handleKeyboardEvent)
              }
              onBlur={() =>
                window.addEventListener("keydown", handleKeyboardEvent)
              }
            />
            <div className="search-suggest box-shadow">
              <ul className="list-group list-group-flush">
                {suggestion[0] && suggestion[0].length ? (
                  <React.Fragment>
                    <li className="search-suggest__header">Bài hát</li>
                    {suggestion[0].map((song) => (
                      <li
                        className="list-song__item list-group-item"
                        key={song._id}
                        onMouseDown={this.handleSelect}
                        data-id={song._id}
                        data-type="song"
                      >
                        <div className="search-suggest__item">
                          <div
                            className="search-suggest__item--img"
                            style={{
                              backgroundImage: `url(${song.image})`,
                            }}
                          ></div>
                          <p className="search-suggest__item--info">
                            {song.title}
                          </p>
                        </div>
                      </li>
                    ))}
                  </React.Fragment>
                ) : (
                  ""
                )}
                {suggestion[1] && suggestion[1].length ? (
                  <React.Fragment>
                    <li className="search-suggest__header">Playlist</li>
                    {suggestion[1].map((playlist) => (
                      <li
                        className="list-song__item list-group-item"
                        key={playlist._id}
                        onMouseDown={this.handleSelect}
                        data-id={playlist._id}
                        data-type="playlist"
                      >
                        <div className="search-suggest__item">
                          <div
                            className="search-suggest__item--img"
                            style={{
                              backgroundImage: `url(${playlist.image})`,
                            }}
                          ></div>
                          <p className="search-suggest__item--info">
                            {playlist.title}
                          </p>
                        </div>
                      </li>
                    ))}
                  </React.Fragment>
                ) : (
                  ""
                )}
                {suggestion[2] && suggestion[2].length ? (
                  <React.Fragment>
                    <li className="search-suggest__header">Nghệ sỹ</li>
                    {suggestion[2].map((artist) => (
                      <li
                        className="list-song__item list-group-item"
                        key={artist._id}
                        onMouseDown={this.handleSelect}
                        data-id={artist._id}
                        data-type="artist"
                      >
                        <div className="search-suggest__item">
                          <div
                            className="search-suggest__item--img rounded-circle"
                            style={{
                              backgroundImage: `url(${artist.image})`,
                            }}
                          ></div>
                          <p className="search-suggest__item--info">
                            {artist.name}
                          </p>
                        </div>
                      </li>
                    ))}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
          <div className="header__content--auth">
            {user.userToken ? (
              <DropdownButton
                id="dropdown-auth"
                title={
                  <div className="auth-link">
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className="user-circle-icon"
                    />
                    <span className="ml-2 d-none d-xl-block">
                      {user.username}
                    </span>
                  </div>
                }
              >
                <Dropdown.Item
                  className="options-list__item"
                  onClick={() => this.setState({ showProfileModal: true })}
                >
                  <div className="option-list__item--icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <span>Thông tin</span>
                </Dropdown.Item>
                <Dropdown.Item
                  className="options-list__item"
                  onClick={() => this.setState({ showLogoutModal: true })}
                >
                  <div className="option-list__item--icon">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </div>
                  <span>Đăng xuất</span>
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              <Link
                to={{
                  pathname: "/login",
                  state: { prevPath: location.pathname },
                }}
                className="auth-link"
              >
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="user-circle-icon"
                />
                <span className="ml-2 d-none d-xl-block">Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>
        <div className="header__banner"></div>

        {/* profile */}
        <Modal
          show={this.state.showProfileModal}
          onHide={() => this.setState({ showProfileModal: false })}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="bg-light">
            <Modal.Title>Thông tin cá nhân</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-light">
            {this.state.update ? (
              <form action="true" method="POST" id="update-profile-form">
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
                    defaultValue={user.username}
                    id="username"
                    name="username"
                    type="text"
                    className="form-control"
                    onBlur={(e) => {
                      if (e.target.value !== user.username)
                        this.checkExisted(e);
                    }}
                    onInput={() => this.setState({ usernameMessage: "" })}
                  />
                  <span className="form-message" />
                  <span className="api-message">
                    {this.state.usernameMessage}
                  </span>
                </div>
                <div
                  className={`form-group ${
                    this.state.emailMessage ? "api-invalid" : ""
                  }`}
                >
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    defaultValue={user.email}
                    id="email"
                    name="email"
                    type="text"
                    className="form-control"
                    onBlur={(e) => {
                      if (e.target.value !== user.email) this.checkExisted(e);
                    }}
                    onInput={() => this.setState({ emailMessage: "" })}
                  />
                  <span className="form-message" />
                  <span className="api-message">{this.state.emailMessage}</span>
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
                    autoComplete="new-password"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Nhập mật khẩu để xác nhận"
                    className="form-control"
                    onChange={() => this.setState({ passwordMessage: "" })}
                  />
                  <span className="form-message" />
                  <span className="api-message">
                    {this.state.passwordMessage}
                  </span>
                </div>

                <button className="form-submit">Lưu thay đổi</button>
              </form>
            ) : (
              <div>
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">Tên đăng nhập:</th>
                      <td>{user.username}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email:</th>
                      <td>{user.email}</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="form-submit"
                  onClick={() => this.setState({ update: true })}
                >
                  Cập nhật
                </button>
              </div>
            )}
          </Modal.Body>
        </Modal>

        {/* logout confirmation */}
        <Modal
          show={this.state.showLogoutModal}
          onHide={() => this.setState({ showLogoutModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Đăng xuất</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn đăng xuất?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showLogoutModal: false })}
            >
              Trở lại
            </Button>
            <Button variant="danger" onClick={this.logout}>
              Đăng xuất
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  suggestion: state.search.suggestion,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setSuggestion: (suggestion) => dispatch(setSuggestion(suggestion)),
  setLikedSong: (songs) => dispatch(setLikedSong(songs)),
  setLikedSongCount: (count) => dispatch(setLikedSongCount(count)),
  setMyPlaylist: (playlists) => dispatch(setMyPlaylist(playlists)),
  setMyPlaylistCount: (count) => dispatch(setMyPlaylistCount(count)),
  setRecommendation: (songs) => dispatch(setRecommendation(songs)),
});

const HeaderWithRouter = withRouter(Header);
export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithRouter);
