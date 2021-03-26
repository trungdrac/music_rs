import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

class RightSIdebar extends Component {
  render() {
    return (
      <div className="right-sidebar">
        <div className="right-sidebar__header">Danh sách phát</div>
        <div className="right-sidebar__body" data-scrollable="true">
          <ul className="list-group list-group-flush">
            <li className="custom-list__item list-group-item">
              <div
                className="text-dark custom-card--inline amplitude-song-container amplitude-play-pause"
                data-amplitude-song-index={0}
                data-amplitude-playlist="special"
              >
                <div
                  className="custom-card--inline-img"
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/MOf9Kxxkj7GvyZlTZOnUzuYv0JAweEhlxJX6gslQvbvlhLK5_bSTK6duxY2xfbBsj43H=w300')"}}
                ></div>
                <div className="custom-card--inline-desc">
                  <p className="text-truncate mb-0">I Love You Mummy</p>
                  <p className="text-truncate text-muted font-sm">
                    Arebica Luna
                  </p>
                </div>
              </div>
              <ul className="custom-card--labels d-flex ml-auto">
                <li className="dropleft">
                  <a
                    href="javascript:void(0);"
                    className="btn btn-icon-only p-0 w-auto h-auto"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <a
                        href="javascript:void(0);"
                        className="dropdown-link favorite"
                      >
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
          </ul>
        </div>
      </div>
    );
  }
}

export default RightSIdebar;
