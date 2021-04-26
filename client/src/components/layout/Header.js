import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/userAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faSignOutAlt,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
  }

  logout = () => {
    this.props.setCurrentUser(null);
    this.setState({ showDialog: false });
  };

  render() {
    const { username } = this.props.user;
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
            />
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
