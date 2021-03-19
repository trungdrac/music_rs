import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header id="header" className="bg-primary">
                <div className="d-flex align-items-center">
                    <button type="button" className="btn toggle-menu mr-3" id="openSidebar">
                        <span />
                        <span />
                        <span />
                    </button>
                    <form action="#" id="searchForm">
                        <button type="button" className="btn ion-ios-search" />
                        <input type="text" placeholder="Search..." id="searchInput" className="form-control" />
                        {/* Begin | Search Card [[ Find at scss/framework/base/search/search.scss ]] */}
                        <div className="search-card" data-scrollable="true">
                            {/* Begin | Search Result List */}
                            <div className="mb-3">
                                {/* Begin | Search Result List Header */}
                                <div className="d-flex">
                                    <span className="text-uppercase mr-auto font-weight-bold text-dark">Artists</span>
                                    <a href="artists.html">View All</a>
                                </div>
                                {/* End | Search Result List Header */}
                                <hr />
                                {/* Begin | Result List */}
                                <div className="row">
                                    <div className="col-xl-2 col-md-4 col-6">
                                        <div className="custom-card mb-3">
                                            <a href="artist-details.html" className="text-dark">
                                                <img src="../public/images/cover/medium/1.jpg" alt="" className="card-img--radius-md" />
                                                <p className="text-truncate mt-2">Arebica Luna</p>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-md-4 col-6">
                                        <div className="custom-card mb-3">
                                            <a href="artist-details.html" className="text-dark">
                                                <img src="../public/images/cover/medium/2.jpg" alt="" className="card-img--radius-md" />
                                                <p className="text-truncate mt-2">Gerrina Linda</p>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-md-4 col-6">
                                        <div className="custom-card mb-3">
                                            <a href="artist-details.html" className="text-dark">
                                                <img src="../public/images/cover/medium/3.jpg" alt="" className="card-img--radius-md" />
                                                <p className="text-truncate mt-2">Zunira Willy</p>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-md-4 col-6">
                                        <div className="custom-card mb-3">
                                            <a href="artist-details.html" className="text-dark">
                                                <img src="../public/images/cover/medium/4.jpg" alt="" className="card-img--radius-md" />
                                                <p className="text-truncate mt-2">Johnny Marro</p>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-md-4 col-6">
                                        <div className="custom-card mb-3">
                                            <a href="artist-details.html" className="text-dark">
                                                <img src="../public/images/cover/medium/5.jpg" alt="" className="card-img--radius-md" />
                                                <p className="text-truncate mt-2">Jina Moore</p>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-md-4 col-6">
                                        <div className="custom-card mb-3">
                                            <a href="artist-details.html" className="text-dark">
                                                <img src="../public/images/cover/medium/6.jpg" alt="" className="card-img--radius-md" />
                                                <p className="text-truncate mt-2">Rasomi Pelina</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* End | Result List */}
                            </div>
                            {/* End | Search Result List */}
                            {/* Begin | Search Result List */}
                            <div className="mb-3">
                                {/* Begin | Search Result List Header */}
                                <div className="d-flex">
                                    <span className="text-uppercase mr-auto font-weight-bold text-dark">Track</span>
                                    <a href="songs.html">View All</a>
                                </div>
                                {/* End | Search Result List Header */}
                                <hr />
                                {/* Begin | Result List */}
                                <div className="row">
                                    <div className="col-xl-4 col-md-6 col-12">
                                        <div className="custom-card mb-3">
                                            <a href="song-details.html" className="text-dark custom-card--inline">
                                                <div className="custom-card--inline-img">
                                                    <img src="../public/images/cover/small/1.jpg" alt="" className="card-img--radius-sm" />
                                                </div>
                                                <div className="custom-card--inline-desc">
                                                    <p className="text-truncate mb-0">I Love You Mummy</p>
                                                    <p className="text-truncate text-muted font-sm">Arebica Luna</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-md-6 col-12">
                                        <div className="custom-card mb-3">
                                            <a href="song-details.html" className="text-dark custom-card--inline">
                                                <div className="custom-card--inline-img">
                                                    <img src="../public/images/cover/small/2.jpg" alt="" className="card-img--radius-sm" />
                                                </div>
                                                <div className="custom-card--inline-desc">
                                                    <p className="text-truncate mb-0">Shack your butty</p>
                                                    <p className="text-truncate text-muted font-sm">Gerrina Linda</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-md-6 col-12">
                                        <div className="custom-card mb-3">
                                            <a href="song-details.html" className="text-dark custom-card--inline">
                                                <div className="custom-card--inline-img">
                                                    <img src="../public/images/cover/small/3.jpg" alt="" className="card-img--radius-sm" />
                                                </div>
                                                <div className="custom-card--inline-desc">
                                                    <p className="text-truncate mb-0">Do it your way(Female)</p>
                                                    <p className="text-truncate text-muted font-sm">Zunira Willy &amp; Nutty Nina</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* End | Result List */}
                            </div>
                            {/* End | Search Result List */}
                            {/* Begin | Search Result List */}
                            <div>
                                {/* Begin | Search Result List Header */}
                                <div className="d-flex">
                                    <span className="text-uppercase mr-auto font-weight-bold text-dark">Albums</span>
                                    <a href="songs.html">View All</a>
                                </div>
                                {/* End | Search Result List Header */}
                                <hr />
                                {/* Begin | Result List */}
                                <div className="row">
                                    <div className="col-xl-4 col-md-6 col-12">
                                        <div className="custom-card mb-3">
                                            <a href="song-details.html" className="text-dark custom-card--inline">
                                                <div className="custom-card--inline-img">
                                                    <img src="../public/images/cover/small/4.jpg" alt="" className="card-img--radius-sm" />
                                                </div>
                                                <div className="custom-card--inline-desc">
                                                    <p className="text-truncate mb-0">Say yes</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-md-6 col-12">
                                        <div className="custom-card mb-3">
                                            <a href="song-details.html" className="text-dark custom-card--inline">
                                                <div className="custom-card--inline-img">
                                                    <img src="../public/images/cover/small/5.jpg" alt="" className="card-img--radius-sm" />
                                                </div>
                                                <div className="custom-card--inline-desc">
                                                    <p className="text-truncate mb-0">Where is your letter</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-md-6 col-12">
                                        <div className="custom-card mb-3">
                                            <a href="song-details.html" className="text-dark custom-card--inline">
                                                <div className="custom-card--inline-img">
                                                    <img src="../public/images/cover/small/6.jpg" alt="" className="card-img--radius-sm" />
                                                </div>
                                                <div className="custom-card--inline-desc">
                                                    <p className="text-truncate mb-0">Hey not me</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* End | Result List */}
                            </div>
                            {/* End | Search Result List */}
                        </div>
                        {/* End | Search Card */}
                    </form>
                    {/* Begin | Header Options */}
                    <ul className="header-options d-flex align-items-center">
                        <li className="dropdown fade-in">
                            <a href="javascript:void(0);" className="d-flex align-items-center py-2" role="button" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="avatar avatar-sm avatar-circle"><img src="../public/images/users/thumb.jpg" alt="user" /></div>
                                <span className="pl-2">Halo Admin</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userMenu">
                                <a className="dropdown-item" href="profile.html"><i className="ion-md-contact" /> <span>Profile</span></a>
                                <a className="dropdown-item" href="plan.html"><i className="ion-md-radio-button-off" /> <span>Your Plan</span></a>
                                <a className="dropdown-item" href="settings.html"><i className="ion-md-settings" /> <span>Settings</span></a>
                                <div className="dropdown-divider" />
                                <div className="px-4 py-2">
                                    <a href="#" className="btn btn-sm btn-air btn-pill btn-danger">Logout</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                    {/* End | Header Options */}
                </div>
            </header>
        );
    }
}

export default Header;
