import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
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

  suggest = debounce((e) => {
    axios
      .get(`/search?q=${e.target.value}`)
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

  handleSelect = (e) => {
    const selectedNode = e.target.closest(".list-song__item.list-group-item");
    const { type, id } = selectedNode.dataset;
    this.props.history.push(`/${type}/detail/${id}`);
    this.searchRef.current.value = "";
    this.props.setSuggestion([]);
  };

  search = () => {
    const input = this.searchRef.current;
    this.props.history.push(`/search/song?q=${input.value}&page=1`);
    input.blur();
  };

  onEnter = (e) => {
    if (e.key === "Enter") this.search();
  };

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

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setSuggestion: (suggestion) => dispatch(setSuggestion(suggestion)),
});

const HeaderWithRouter = withRouter(Header);
export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithRouter);
