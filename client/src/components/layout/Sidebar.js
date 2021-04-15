import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHome,
  faListUl,
  faMicrophone,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.arrowRef = React.createRef();
  }

  slideOff = () => {
    const arrow = this.arrowRef.current;
    //check arrow icon is visible
    if (arrow.offsetParent) arrow.click();
  };

  render() {
    return (
      <div className="sidebar translate-on-md">
        <div className="sidebar__header">
          <div>
            <Link to="/" onClick={this.slideOff}>
              <img src={"/images/logos/logo.svg"} alt="logo-app" />
            </Link>
          </div>
          <label
            htmlFor="sidebar-checkbox"
            className="sidebar__header--arrow d-xl-none"
            ref={this.arrowRef}
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
            <li className="sidebar__nav--header">Khám phá</li>
            <li onClick={this.slideOff}>
              <NavLink
                to="/song/"
                className="sidebar__nav--link"
                activeClassName="active"
              >
                <FontAwesomeIcon icon={faMusic} className="sidebar-icon" />
                <span>Bài hát</span>
              </NavLink>
            </li>
            <li onClick={this.slideOff}>
              <NavLink
                to="/playlist/"
                className="sidebar__nav--link"
                activeClassName="active"
              >
                <FontAwesomeIcon icon={faListUl} className="sidebar-icon" />
                <span>Playlist</span>
              </NavLink>
            </li>
            <li onClick={this.slideOff}>
              <NavLink
                to="/artist/"
                className="sidebar__nav--link"
                activeClassName="active"
              >
                <FontAwesomeIcon icon={faMicrophone} className="sidebar-icon" />
                <span>Nghệ sỹ</span>
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
