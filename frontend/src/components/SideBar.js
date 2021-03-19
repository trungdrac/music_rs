import React, { Component } from 'react';

class SideBar extends Component {
    render() {
        return (
            <aside id="sidebar" className="sidebar-primary">
                {/* Begin | Sidebar Header */}
                <div className="sidebar-header d-flex align-items-center">
                    <a href="../index.html" className="brand">
                        <img src="../public/images/logos/logo.svg" alt="listen-app" />
                    </a>
                    <button type="button" className="btn p-0 ml-auto" id="hideSidebar">
                        <i className="ion-md-arrow-back h3" />
                    </button>
                    <button type="button" className="btn toggle-menu" id="toggleSidebar">
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
                {/* End | Sidebar Header */}
                {/* Begin | Navbar [[ Find at scss/framework/components/navbar/navbar.scss ]] */}
                <nav className="navbar">
                    <ul className="navbar-nav" data-scrollable="true">
                        <li className="nav-item nav-header">Browse Music</li>
                        <li className="nav-item">
                            <a href="home.html" className="nav-link active"><i className="la la-home" /><span>Home</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="genres.html" className="nav-link"><i className="la la-diamond" /><span>Genres</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="music.html" className="nav-link"><i className="la la-music" /><span>Free Music</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="artists.html" className="nav-link"><i className="la la-microphone" /><span>Artists</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="stations.html" className="nav-link"><i className="la la-bullseye" /><span>Stations</span></a>
                        </li>
                        <li className="nav-item nav-header">Your Music</li>
                        <li className="nav-item">
                            <a href="analytics.html" className="nav-link"><i className="la la-bar-chart" /><span>Analytics</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="favorites.html" className="nav-link"><i className="la la-heart-o" /><span>Favorites</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="history.html" className="nav-link"><i className="la la-history" /><span>History</span></a>
                        </li>
                        <li className="nav-item nav-header">Music Events</li>
                        <li className="nav-item">
                            <a href="events.html" className="nav-link"><i className="la la-calendar" /><span>Events</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="event-details.html" className="nav-link"><i className="la la-newspaper-o" /><span>Event Details</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="add-event.html" className="nav-link"><i className="la la-pencil-square-o" /><span>Add Event</span></a>
                        </li>
                        <li className="nav-item nav-header">Extra Pages</li>
                        <li className="nav-item">
                            <a href="error.html" className="nav-link load-page"><i className="la la-times-circle-o" /><span>Error</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="blank.html" className="nav-link"><i className="la la-file" /><span>Blank</span></a>
                        </li>
                    </ul>
                </nav>
                {/* End | Navbar */}
                {/* Begin | Sidebar Footer */}
                <div className="sidebar-footer">
                    <a href="add-music.html" className="btn btn-block btn-danger btn-air btn-bold">
                        <i className="ion-md-musical-note" />
                        <span>Add Music</span>
                    </a>
                </div>
                {/* End | Sidebar Footer */}
            </aside>

        );
    }
}

export default SideBar;
