import React, { Component } from 'react';

class RightSideBar extends Component {
    render() {
        return (
            <aside id="rightSidebar">
                <div className="right-sidebar-header">Listen Special</div>
                <div className="right-sidebar-body" data-scrollable="true">
                    <ul className="list-group list-group-flush">
                        {/* Begin | Custom List Item */}
                        <li className="custom-list--item list-group-item">
                            <div className="text-dark custom-card--inline amplitude-song-container amplitude-play-pause" data-amplitude-song-index={0} data-amplitude-playlist="special">
                                <div className="custom-card--inline-img">
                                    <img src="../public/images/cover/small/1.jpg" alt="" className="card-img--radius-sm" />
                                </div>
                                <div className="custom-card--inline-desc">
                                    <p className="text-truncate mb-0">I Love You Mummy</p>
                                    <p className="text-truncate text-muted font-sm">Arebica Luna</p>
                                </div>
                            </div>
                            <ul className="custom-card--labels d-flex ml-auto">
                                <li className="dropleft">
                                    <a href="javascript:void(0);" className="btn btn-icon-only p-0 w-auto h-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="la la-ellipsis-h" />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link favorite">
                                                <i className="la la-heart-o" />
                                                <span>Favorite</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-plus" />
                                                <span>Add to Playlist</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-download" />
                                                <span>Download</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-share-alt" />
                                                <span>Share</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="song-details.html" className="dropdown-link">
                                                <i className="la la-info-circle" />
                                                <span>Song Info</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        {/* End | Custom List Item */}
                        {/* Begin | Custom List Item */}
                        <li className="custom-list--item list-group-item">
                            <div className="text-dark custom-card--inline amplitude-song-container amplitude-play-pause" data-amplitude-song-index={1} data-amplitude-playlist="special">
                                <div className="custom-card--inline-img">
                                    <img src="../public/images/cover/small/2.jpg" alt="" className="card-img--radius-sm" />
                                </div>
                                <div className="custom-card--inline-desc">
                                    <p className="text-truncate mb-0">Shack your butty</p>
                                    <p className="text-truncate text-muted font-sm">Gerrina Linda</p>
                                </div>
                            </div>
                            <ul className="custom-card--labels d-flex ml-auto">
                                <li className="dropleft">
                                    <a href="javascript:void(0);" className="btn btn-icon-only p-0 w-auto h-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="la la-ellipsis-h" />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link favorite">
                                                <i className="la la-heart-o" />
                                                <span>Favorite</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-plus" />
                                                <span>Add to Playlist</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-download" />
                                                <span>Download</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-share-alt" />
                                                <span>Share</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="song-details.html" className="dropdown-link">
                                                <i className="la la-info-circle" />
                                                <span>Song Info</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        {/* End | Custom List Item */}
                        {/* Begin | Custom List Item */}
                        <li className="custom-list--item list-group-item">
                            <div className="text-dark custom-card--inline amplitude-song-container amplitude-play-pause" data-amplitude-song-index={2} data-amplitude-playlist="special">
                                <div className="custom-card--inline-img">
                                    <img src="../public/images/cover/small/3.jpg" alt="" className="card-img--radius-sm" />
                                </div>
                                <div className="custom-card--inline-desc">
                                    <p className="text-truncate mb-0">Do it your way(Female)</p>
                                    <p className="text-truncate text-muted font-sm">Zunira Willy &amp; Nutty Nina</p>
                                </div>
                            </div>
                            <ul className="custom-card--labels d-flex ml-auto">
                                <li className="dropleft">
                                    <a href="javascript:void(0);" className="btn btn-icon-only p-0 w-auto h-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="la la-ellipsis-h" />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link favorite">
                                                <i className="la la-heart-o" />
                                                <span>Favorite</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-plus" />
                                                <span>Add to Playlist</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-download" />
                                                <span>Download</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-share-alt" />
                                                <span>Share</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="song-details.html" className="dropdown-link">
                                                <i className="la la-info-circle" />
                                                <span>Song Info</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        {/* End | Custom List Item */}
                        {/* Begin | Custom List Item */}
                        <li className="custom-list--item list-group-item">
                            <div className="text-dark custom-card--inline amplitude-song-container amplitude-play-pause" data-amplitude-song-index={3} data-amplitude-playlist="special">
                                <div className="custom-card--inline-img">
                                    <img src="../public/images/cover/small/4.jpg" alt="" className="card-img--radius-sm" />
                                </div>
                                <div className="custom-card--inline-desc">
                                    <p className="text-truncate mb-0">Say yes</p>
                                    <p className="text-truncate text-muted font-sm">Johnny Marro</p>
                                </div>
                            </div>
                            <ul className="custom-card--labels d-flex ml-auto">
                                <li className="dropleft">
                                    <a href="javascript:void(0);" className="btn btn-icon-only p-0 w-auto h-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="la la-ellipsis-h" />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link favorite">
                                                <i className="la la-heart-o" />
                                                <span>Favorite</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-plus" />
                                                <span>Add to Playlist</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-download" />
                                                <span>Download</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-share-alt" />
                                                <span>Share</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="song-details.html" className="dropdown-link">
                                                <i className="la la-info-circle" />
                                                <span>Song Info</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        {/* End | Custom List Item */}
                        {/* Begin | Custom List Item */}
                        <li className="custom-list--item list-group-item">
                            <div className="text-dark custom-card--inline amplitude-song-container amplitude-play-pause" data-amplitude-song-index={4} data-amplitude-playlist="special">
                                <div className="custom-card--inline-img">
                                    <img src="../public/images/cover/small/5.jpg" alt="" className="card-img--radius-sm" />
                                </div>
                                <div className="custom-card--inline-desc">
                                    <p className="text-truncate mb-0">Where is your letter</p>
                                    <p className="text-truncate text-muted font-sm">Jina Moore &amp; Lenisa Gory</p>
                                </div>
                            </div>
                            <ul className="custom-card--labels d-flex ml-auto">
                                <li className="dropleft">
                                    <a href="javascript:void(0);" className="btn btn-icon-only p-0 w-auto h-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="la la-ellipsis-h" />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link favorite">
                                                <i className="la la-heart-o" />
                                                <span>Favorite</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-plus" />
                                                <span>Add to Playlist</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-download" />
                                                <span>Download</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-share-alt" />
                                                <span>Share</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="song-details.html" className="dropdown-link">
                                                <i className="la la-info-circle" />
                                                <span>Song Info</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        {/* End | Custom List Item */}
                        {/* Begin | Custom List Item */}
                        <li className="custom-list--item list-group-item">
                            <div className="text-dark custom-card--inline amplitude-song-container amplitude-play-pause" data-amplitude-song-index={5} data-amplitude-playlist="special">
                                <div className="custom-card--inline-img">
                                    <img src="../public/images/cover/small/6.jpg" alt="" className="card-img--radius-sm" />
                                </div>
                                <div className="custom-card--inline-desc">
                                    <p className="text-truncate mb-0">Hey not me</p>
                                    <p className="text-truncate text-muted font-sm">Rasomi Pelina</p>
                                </div>
                            </div>
                            <ul className="custom-card--labels d-flex ml-auto">
                                <li className="dropleft">
                                    <a href="javascript:void(0);" className="btn btn-icon-only p-0 w-auto h-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="la la-ellipsis-h" />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link favorite">
                                                <i className="la la-heart-o" />
                                                <span>Favorite</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-plus" />
                                                <span>Add to Playlist</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-download" />
                                                <span>Download</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-share-alt" />
                                                <span>Share</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="song-details.html" className="dropdown-link">
                                                <i className="la la-info-circle" />
                                                <span>Song Info</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        {/* End | Custom List Item */}
                        {/* Begin | Custom List Item */}
                        <li className="custom-list--item list-group-item">
                            <div className="text-dark custom-card--inline amplitude-song-container amplitude-play-pause" data-amplitude-song-index={6} data-amplitude-playlist="special">
                                <div className="custom-card--inline-img">
                                    <img src="../public/images/cover/small/7.jpg" alt="" className="card-img--radius-sm" />
                                </div>
                                <div className="custom-card--inline-desc">
                                    <p className="text-truncate mb-0">Deep inside</p>
                                    <p className="text-truncate text-muted font-sm">Pimila Holliwy</p>
                                </div>
                            </div>
                            <ul className="custom-card--labels d-flex ml-auto">
                                <li className="dropleft">
                                    <a href="javascript:void(0);" className="btn btn-icon-only p-0 w-auto h-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="la la-ellipsis-h" />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link favorite">
                                                <i className="la la-heart-o" />
                                                <span>Favorite</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-plus" />
                                                <span>Add to Playlist</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-download" />
                                                <span>Download</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="javascript:void(0);" className="dropdown-link">
                                                <i className="la la-share-alt" />
                                                <span>Share</span>
                                            </a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="song-details.html" className="dropdown-link">
                                                <i className="la la-info-circle" />
                                                <span>Song Info</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        {/* End | Custom List Item */}
                    </ul>
                </div>
            </aside>
        );
    }
}

export default RightSideBar;
