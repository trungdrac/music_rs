import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/userAction";
import { setSuggestion } from "../../actions/searchAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faSignOutAlt,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import debounce from "../../helpers/debounce";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
    this.searchRef = React.createRef();
  }

  search = debounce((e) => {
    const data = { text: e.target.value };
    axios
      .post("/search", data)
      .then((res) => {
        const suggestion = res.data;
        this.props.setSuggestion(suggestion);
      })
      .catch((error) =>
        alert(
          `Lỗi! ${
            error.response.data.message ? error.response.data.message : ""
          }`
        )
      );
  }, 500);

  logout = () => {
    this.props.setCurrentUser(null);
    this.setState({ showDialog: false });
  };

  render() {
    const { username } = this.props.user;
    const { suggestion } = this.props;
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
          <div className="header__content--search">
            <button className="search-icon">
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm..."
              onChange={this.search}
              ref={this.searchRef}
            />
            <div className="search-suggest box-shadow">
              <ul className="list-group list-group-flush">
                {suggestion[0].length ? (
                  <React.Fragment>
                    <li className="search-suggest__header">Bài hát</li>
                    {suggestion[0].map((song) => (
                      <li key={song._id}>
                        <Link
                          exact
                          to={`/song/detail/${song._id}`}
                          className="list-song__item list-group-item"
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
                        </Link>
                      </li>
                    ))}
                  </React.Fragment>
                ) : (
                  ""
                )}
                {suggestion[1].length ? (
                  <React.Fragment>
                    <li className="search-suggest__header">Playlist</li>
                    {suggestion[1].map((playlist) => (
                      <li key={playlist._id}>
                        <Link
                          exact
                          to={`/playlist/detail/${playlist._id}`}
                          className="list-song__item list-group-item"
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
                        </Link>
                      </li>
                    ))}
                  </React.Fragment>
                ) : (
                  ""
                )}
                {suggestion[2].length ? (
                  <React.Fragment>
                    <li className="search-suggest__header">Nghệ sỹ</li>
                    {suggestion[2].map((artist) => (
                      <li key={artist._id}>
                        <Link
                          exact
                          to={`/artist/detail/${artist._id}`}
                          className="list-song__item list-group-item"
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
                        </Link>
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
            {username ? (
              <DropdownButton id="dropdown-auth" title={username}>
                <Dropdown.Item href="#/action-1" className="options-list__item">
                  <div className="option-list__item--icon">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </div>
                  <span>Thông tin</span>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2" className="options-list__item">
                  <div className="option-list__item--icon">
                    <FontAwesomeIcon icon={faUnlockAlt} />
                  </div>
                  <span>Cập nhật</span>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="options-list__item"
                  onClick={() => this.setState({ showDialog: true })}
                >
                  <div className="option-list__item--icon">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </div>
                  <span>Đăng xuất</span>
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              <Link to="/login" className="auth-link">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
        <div className="header__banner"></div>
        <Modal
          show={this.state.showDialog}
          onHide={() => this.setState({ showDialog: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Đăng xuất</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn đăng xuất?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showDialog: false })}
            >
              Trở lại
            </Button>
            <Button variant="primary" onClick={this.logout}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setSuggestion: (suggestion) => dispatch(setSuggestion(suggestion)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
