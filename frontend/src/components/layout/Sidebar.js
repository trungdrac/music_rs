import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar translate-on-md">
        <div className="sidebar__header">
          <a href="/" className="">
            <img src={"./images/logos/logo.svg"} alt="logo-app" />
          </a>
        </div>
        <nav className="sidebar__nav">
          <ul className="list-group">
            <li className="sidebar__nav--item sidebar__nav--header">Browse Music</li>
            <li className="sidebar__nav--item active" aria-current="true">
              <a href="/" className="sidebar__nav--link">
                <FontAwesomeIcon icon={faHome} />
                <span>Trang chủ</span>
              </a>
            </li>
            <li className="sidebar__nav--item">
              <a href="/" className="sidebar__nav--link">
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </a>
            </li>
            <li className="sidebar__nav--item">
              <a href="/" className="sidebar__nav--link">
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </a>
            </li>
            <li className="sidebar__nav--item">
              <a href="/" className="sidebar__nav--link">
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </a>
            </li>
            <li className="sidebar__nav--item sidebar__nav--header">Music Events</li>
            <li className="sidebar__nav--item">
              <a href="/" className="sidebar__nav--link">
                <span>Events</span>
              </a>
            </li>
            <li className="sidebar__nav--item">
              <a href="/" className="sidebar__nav--link">
                <span>Event Details</span>
              </a>
            </li>
            <li className="sidebar__nav--item">
              <a href="/" className="sidebar__nav--link">
                <span>Add Event</span>
              </a>
            </li>
            <li className="sidebar__nav--item sidebar__nav--header">Extra Pages</li>
            <li className="sidebar__nav--item">
              <a href="/" className="sidebar__nav--link load-page">
                <span>Error</span>
              </a>
            </li>
            <li className="sidebar__nav--item">
              <a href="/" className="sidebar__nav--link">
                <span>Blank</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="sidebar__nav--footer">
          <a href="/" className="btn btn-block btn-danger">
            <span>Thêm nhạc</span>
          </a>
        </div>
      </div>
    );
  }
}

export default Sidebar;
