import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.sidebarRef = React.createRef();
  }

  slideOff = () => {
    this.sidebarRef.current.click();
  };

  render() {
    return (
      <div className="sidebar translate-on-md">
        <div className="sidebar__header">
          <Link to="/" onClick={this.slideOff}>
            <img src={"/images/logos/logo.svg"} alt="logo-app" />
          </Link>
          <label
            htmlFor="sidebar-checkbox"
            className="sidebar__header--arrow d-xl-none"
            ref={this.sidebarRef}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </label>
        </div>
        <nav className="sidebar__nav">
          <ul className="list-group">
            <li className="sidebar__nav--header">Browse Music</li>
            <li onClick={this.slideOff}>
              <NavLink
                exact
                to="/"
                className="sidebar__nav--link"
                activeClassName="active"
              >
                <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
                <span>Trang chủ</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="sidebar__footer">
          <Link to="/" className="btn btn-block btn-danger">
            <span>Thêm nhạc</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;
