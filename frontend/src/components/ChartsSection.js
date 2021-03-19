import React, { Component } from 'react';

class ChartsSection extends Component {
    render() {
        return (
            <div className="row">
                {/* Begin | Section [[ Find at scss/base/core.scss ]] */}
                <div className="section col-xl-7 col-lg-6">
                    <div className="row h-100">
                        <div className="col-sm-5 pb-4">
                            <div className="h-100 event event-v bg-img bg-img-radius-lg" style={{ backgroundImage: 'url("../public/images/background/vertical/1.jpg")' }}>
                                <div className="event-content p-4">
                                    <a href="event-details.html"><h6>New Year Party</h6></a>
                                    <span className="countdown mb-3" />
                                    <a href="#" className="btn btn-bold btn-pill btn-air btn-warning btn-sm">Buy Ticket</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="h-50 pb-4">
                                <div className="h-100 event event-h bg-img bg-img-radius-lg" style={{ backgroundImage: 'url("../public/images/background/horizontal/1.jpg")' }}>
                                    <div className="event-content p-4">
                                        <a href="event-details.html"><h6>Dance with DJ Nowan</h6></a>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consectetur, ex explicabo.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-50 pb-4">
                                <div className="h-100 event event-h bg-img bg-img-radius-lg" style={{ backgroundImage: 'url("../public/images/background/horizontal/2.jpg")' }}>
                                    <div className="event-content p-4">
                                        <a href="event-details.html"><h6>Move You's Legs</h6></a>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consectetur, ex explicabo.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End | Section */}
                {/* Begin | Section [[ Find at scss/base/core.scss ]] */}
                <div className="section col-xl-5 col-lg-6">
                    {/* Begin | Line Tabs [[ Find at scss/framework/components/line-tabs.scss ]] */}
                    <ul className="nav nav-tabs line-tabs line-tabs-primary text-uppercase mb-4" id="songsList" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="recent-tab" data-toggle="tab" href="#recent" role="tab" aria-controls="recent" aria-selected="true">Recent</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="trending-tab" data-toggle="tab" href="#trending" role="tab" aria-controls="trending" aria-selected="false">Trending</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="international-tab" data-toggle="tab" href="#international" role="tab" aria-controls="international" aria-selected="false">International</a>
                        </li>
                    </ul>
                    {/* End | Line Tabs */}
                    {/* Begin | Tab Content */}
                    <div className="tab-content" id="songsListContent">
                        <div className="tab-pane fade show active" id="recent" role="tabpanel" aria-labelledby="recent-tab">
                            {/* Begin | Custom List [[ Find at scss/framework/components/custom-list.scss ]] */}
                            <div className="custom-list">
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
                                        <div className="custom-card--inline-img">
                                            <img src="../public/images/cover/small/1.jpg" alt="" className="card-img--radius-sm" />
                                        </div>
                                        <div className="custom-card--inline-desc">
                                            <p className="text-truncate mb-0">I Love You Mummy</p>
                                            <p className="text-truncate text-muted font-sm">Arebica Luna</p>
                                        </div>
                                    </div>
                                    <ul className="custom-card--labels d-flex ml-auto">
                                        <li><span className="badge badge-pill badge-warning"><i className="la la-star" /></span></li>
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
                                        <div className="custom-card--inline-img">
                                            <img src="../public/images/cover/small/3.jpg" alt="" className="card-img--radius-sm" />
                                        </div>
                                        <div className="custom-card--inline-desc">
                                            <p className="text-truncate mb-0">Do it your way(Female)</p>
                                            <p className="text-truncate text-muted font-sm">Zunira Willy &amp; Nutty Nina</p>
                                        </div>
                                    </div>
                                    <ul className="custom-card--labels d-flex ml-auto">
                                        <li><span className="badge badge-pill badge-danger"><i className="la la-heart" /></span></li>
                                        <li><span className="badge badge-pill badge-warning"><i className="la la-star" /></span></li>
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
                                        <div className="custom-card--inline-img">
                                            <img src="../public/images/cover/small/5.jpg" alt="" className="card-img--radius-sm" />
                                        </div>
                                        <div className="custom-card--inline-desc">
                                            <p className="text-truncate mb-0">Where is your letter</p>
                                            <p className="text-truncate text-muted font-sm">Jina Moore &amp; Lenisa Gory</p>
                                        </div>
                                    </div>
                                    <ul className="custom-card--labels d-flex ml-auto">
                                        <li><span className="badge badge-pill badge-danger"><i className="la la-heart" /></span></li>
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
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
                                </div>
                                {/* End | Custom List Item */}
                            </div>
                            {/* End | Custom List */}
                        </div>
                        <div className="tab-pane fade" id="trending" role="tabpanel" aria-labelledby="trending-tab">
                            {/* Begin | Custom List [[ Find at scss/framework/components/custom-list.scss ]] */}
                            <div className="custom-list">
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
                                        <div className="custom-card--inline-img">
                                            <img src="../public/images/cover/small/1.jpg" alt="" className="card-img--radius-sm" />
                                        </div>
                                        <div className="custom-card--inline-desc">
                                            <p className="text-truncate mb-0">I Love You Mummy</p>
                                            <p className="text-truncate text-muted font-sm">Arebica Luna</p>
                                        </div>
                                    </div>
                                    <ul className="custom-card--labels d-flex ml-auto">
                                        <li><span className="badge badge-pill badge-warning"><i className="la la-star" /></span></li>
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
                                        <div className="custom-card--inline-img">
                                            <img src="../public/images/cover/small/3.jpg" alt="" className="card-img--radius-sm" />
                                        </div>
                                        <div className="custom-card--inline-desc">
                                            <p className="text-truncate mb-0">Do it your way(Female)</p>
                                            <p className="text-truncate text-muted font-sm">Zunira Willy &amp; Nutty Nina</p>
                                        </div>
                                    </div>
                                    <ul className="custom-card--labels d-flex ml-auto">
                                        <li><span className="badge badge-pill badge-danger"><i className="la la-heart" /></span></li>
                                        <li><span className="badge badge-pill badge-warning"><i className="la la-star" /></span></li>
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
                                        <div className="custom-card--inline-img">
                                            <img src="../public/images/cover/small/5.jpg" alt="" className="card-img--radius-sm" />
                                        </div>
                                        <div className="custom-card--inline-desc">
                                            <p className="text-truncate mb-0">Where is your letter</p>
                                            <p className="text-truncate text-muted font-sm">Jina Moore &amp; Lenisa Gory</p>
                                        </div>
                                    </div>
                                    <ul className="custom-card--labels d-flex ml-auto">
                                        <li><span className="badge badge-pill badge-danger"><i className="la la-heart" /></span></li>
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
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
                                </div>
                                {/* End | Custom List Item */}
                            </div>
                            {/* End | Custom List */}
                        </div>
                        <div className="tab-pane fade" id="international" role="tabpanel" aria-labelledby="international-tab">
                            {/* Begin | Custom List [[ Find at scss/framework/components/custom-list.scss ]] */}
                            <div className="custom-list">
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
                                        <div className="custom-card--inline-img">
                                            <img src="../public/images/cover/small/1.jpg" alt="" className="card-img--radius-sm" />
                                        </div>
                                        <div className="custom-card--inline-desc">
                                            <p className="text-truncate mb-0">I Love You Mummy</p>
                                            <p className="text-truncate text-muted font-sm">Arebica Luna</p>
                                        </div>
                                    </div>
                                    <ul className="custom-card--labels d-flex ml-auto">
                                        <li><span className="badge badge-pill badge-warning"><i className="la la-star" /></span></li>
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
                                        <div className="custom-card--inline-img">
                                            <img src="../public/images/cover/small/3.jpg" alt="" className="card-img--radius-sm" />
                                        </div>
                                        <div className="custom-card--inline-desc">
                                            <p className="text-truncate mb-0">Do it your way(Female)</p>
                                            <p className="text-truncate text-muted font-sm">Zunira Willy &amp; Nutty Nina</p>
                                        </div>
                                    </div>
                                    <ul className="custom-card--labels d-flex ml-auto">
                                        <li><span className="badge badge-pill badge-danger"><i className="la la-heart" /></span></li>
                                        <li><span className="badge badge-pill badge-warning"><i className="la la-star" /></span></li>
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
                                        <div className="custom-card--inline-img">
                                            <img src="../public/images/cover/small/5.jpg" alt="" className="card-img--radius-sm" />
                                        </div>
                                        <div className="custom-card--inline-desc">
                                            <p className="text-truncate mb-0">Where is your letter</p>
                                            <p className="text-truncate text-muted font-sm">Jina Moore &amp; Lenisa Gory</p>
                                        </div>
                                    </div>
                                    <ul className="custom-card--labels d-flex ml-auto">
                                        <li><span className="badge badge-pill badge-danger"><i className="la la-heart" /></span></li>
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
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
                                </div>
                                {/* End | Custom List Item */}
                                {/* Begin | Custom List Item */}
                                <div className="custom-list--item">
                                    <div className="text-dark custom-card--inline">
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
                                </div>
                                {/* End | Custom List Item */}
                            </div>
                            {/* End | Custom List */}
                        </div>
                    </div>
                    {/* End | Tab Content */}
                </div>
                {/* End | Section */}
            </div>
        );
    }
}

export default ChartsSection;
