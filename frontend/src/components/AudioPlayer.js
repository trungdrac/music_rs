import React, { Component } from 'react';

class AudioPlayer extends Component {
    render() {
        return (
            <div id="audioPlayer" className="player-primary">
                {/* Begin | Audio Player Progress */}
                <div id="progress-container">
                    <input type="range" className="amplitude-song-slider" />
                    <progress className="audio-progress audio-progress--played amplitude-song-played-progress" />
                    <progress className="audio-progress audio-progress--buffered amplitude-buffered-progress" value={0} />
                </div>
                {/* End | Audio Player Progress */}
                {/* Begin | Audio */}
                <div className="audio">
                    <div className="song-image"><img data-amplitude-song-info="cover_art_url" src="../public/images/cover/small/1.jpg" alt="" /></div>
                    <div className="song-info pl-3">
                        <span className="song-name d-inline-block text-truncate" data-amplitude-song-info="name" />
                        <span className="song-artists d-block text-muted" data-amplitude-song-info="artist" />
                    </div>
                </div>
                {/* End | Audio */}
                {/* Begin | Audio Controls */}
                <div className="audio-controls">
                    <div className="audio-controls--left d-flex mr-auto">
                        <button className="btn btn-icon-only amplitude-repeat"><i className="ion-md-sync" /></button>
                    </div>
                    <div className="audio-controls--main d-flex">
                        <button className="btn btn-icon-only amplitude-prev"><i className="ion-md-skip-backward" /></button>
                        <button className="btn btn-air btn-pill btn-default btn-icon-only amplitude-play-pause">
                            <i className="ion-md-play" />
                            <i className="ion-md-pause" />
                        </button>
                        <button className="btn btn-icon-only amplitude-next"><i className="ion-md-skip-forward" /></button>
                    </div>
                    <div className="audio-controls--right d-flex ml-auto">
                        <button className="btn btn-icon-only amplitude-shuffle amplitude-shuffle-off"><i className="ion-md-shuffle" /></button>
                    </div>
                </div>
                {/* End | Audio Controls */}
                {/* Begin | Audio Info */}
                <div className="audio-info d-flex align-items-center pr-4">
                    <span className="mr-4">
                        <span className="amplitude-current-minutes" />:<span className="amplitude-current-seconds" /> /
        <span className="amplitude-duration-minutes" />:<span className="amplitude-duration-seconds" />
                    </span>
                    <div className="audio-volume dropdown">
                        <button className="btn btn-icon-only" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="ion-md-volume-low" />
                        </button>
                        <div className="dropdown-menu dropdown-menu-right volume-dropdown-menu">
                            <input type="range" className="amplitude-volume-slider" defaultValue={100} />
                        </div>
                    </div>
                    <div className="dropleft">
                        <button className="btn btn-icon-only" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="la la-ellipsis-v" />
                        </button>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item">
                                <a href="javascript:void(0);" className="dropdown-link">
                                    <i className="la la-heart-o" /> <span>Favorite</span>
                                </a>
                            </li>
                            <li className="dropdown-item">
                                <a href="javascript:void(0);" className="dropdown-link">
                                    <i className="la la-plus" /> <span>Add to Playlist</span>
                                </a>
                            </li>
                            <li className="dropdown-item">
                                <a href="javascript:void(0);" className="dropdown-link">
                                    <i className="la la-download" /> <span>Download</span>
                                </a>
                            </li>
                            <li className="dropdown-item">
                                <a href="javascript:void(0);" className="dropdown-link">
                                    <i className="la la-share-alt" /> <span>Share</span>
                                </a>
                            </li>
                            <li className="dropdown-item">
                                <a href="song-details.html" className="dropdown-link">
                                    <i className="la la-info-circle" />
                                    <span>Song Info</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-icon-only" id="playList"><i className="ion-md-musical-note" /></button>
                </div>
                {/* End | Audio Info */}
            </div>
        );
    }
}

export default AudioPlayer;
