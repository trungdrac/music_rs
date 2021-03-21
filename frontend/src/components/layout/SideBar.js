import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class SideBar extends Component {
    render() {
        return (
            <div className="sidebar hide-on-tablet hide-on-mobile">
                <div className="sidebar__header">
                    <a href="/" className="">
                        <img src={"./images/logos/logo.svg"} alt="logo-app" />
                    </a>
                </div>
                <nav className="sidebar__nav">
                    <ul className="navbar-nav">
                        <li className="nav-item nav-header">Browse Music</li>
                        <li className="nav-item active" aria-current="true">
                            <a href="/" className="nav-link">
                                <FontAwesomeIcon icon={faHome} />
                                <span>Trang chủ</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="nav-link">
                                <FontAwesomeIcon icon={faHome} />
                                <span>Home</span>
                            </a>
                        </li><li className="nav-item">
                            <a href="/" className="nav-link">
                                <FontAwesomeIcon icon={faHome} />
                                <span>Home</span>
                            </a>
                        </li><li className="nav-item">
                            <a href="/" className="nav-link">
                                <FontAwesomeIcon icon={faHome} />
                                <span>Home</span>
                            </a>
                        </li>
                        <li className="nav-item nav-header">Music Events</li>
                        <li className="nav-item">
                            <a href="/" className="nav-link"><span>Events</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="nav-link"><span>Event Details</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="nav-link"><span>Add Event</span></a>
                        </li>
                        <li className="nav-item nav-header">Extra Pages</li>
                        <li className="nav-item">
                            <a href="/" className="nav-link load-page"><span>Error</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="nav-link"><span>Blank</span></a>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar__footer">
                    <a href="/" className="btn btn-block btn-danger">
                        <span>Thêm nhạc</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default SideBar;
