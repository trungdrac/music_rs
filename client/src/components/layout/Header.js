import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

class Header extends Component {
  render() {
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
            <Link to="/login" className="auth-link">
              Đăng nhập
            </Link>
          </div>
        </div>
        <div className="header__banner"></div>
      </div>
    );
  }
}

export default Header;
