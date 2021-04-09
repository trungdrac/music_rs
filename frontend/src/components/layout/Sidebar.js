import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMicrophone } from "@fortawesome/free-solid-svg-icons";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar translate-on-md">
        <div className="sidebar__header">
          <Link to="/" className="">
            <img src={process.env.PUBLIC_URL + "./images/logos/logo.svg"} alt="logo-app" />
          </Link>
        </div>
        <nav className="sidebar__nav">
          <ul className="list-group">
            <li className="sidebar__nav--item sidebar__nav--header">
              Browse Music
            </li>
            <li className="sidebar__nav--item active" aria-current="true">
              <Link to="/" className="sidebar__nav--link">
                <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
                <span>Trang chủ</span>
              </Link>
            </li>
            <li className="sidebar__nav--item">
              <Link to="/" className="sidebar__nav--link">
                <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
                <span>Home</span>
              </Link>
            </li>
            <li className="sidebar__nav--item">
              <Link to="/" className="sidebar__nav--link">
                <FontAwesomeIcon icon={faMicrophone} className="sidebar-icon" />
                <span>Ca sĩ</span>
              </Link>
            </li>
            <li className="sidebar__nav--item sidebar__nav--header">
              Music Events
            </li>
            <li className="sidebar__nav--item">
              <Link to="/" className="sidebar__nav--link">
                <span>Events</span>
              </Link>
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
