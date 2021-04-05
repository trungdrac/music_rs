import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/playerAction";
import OptionsList from "./OptionsList";
import { DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

class RightSidebar extends Component {
  pickSong = (e) => {
    const songNode = e.target.closest(".list-song__item:not(.active)");
    const songOption = e.target.closest(".song-options");
    if (songNode && !songOption) {
      const newLoadedSongs = this.props.loadedSongs;
      const newIndex = Number(songNode.dataset.index);
      const promise = new Promise((resolve) => {
        this.props.setCurrentIndex(newIndex);
        resolve();
      });
      promise.then(() => {
        newLoadedSongs.push(this.props.currentIndex);
        this.props.setLoadedSongs(newLoadedSongs);
      });
    }
  };

  render() {
    return (
      <div className="right-sidebar box-shadow">
        <div className="right-sidebar__header">Danh sách phát</div>
        <div className="right-sidebar__body">
          <ul
            className="list-group list-group-flush"
            onClick={(e) => this.pickSong(e)}
          >
            {this.props.playlist.map((song, index) => {
              return (
                <li
                  className={`list-song__item list-group-item ${
                    index === this.props.currentIndex ? "active" : ""
                  }`}
                  key={index}
                  data-index={index}
                >
                  <div className="song-inline">
                    <div
                      className="song-inline__img"
                      style={{
                        backgroundImage: `url(${song.image})`,
                      }}
                    ></div>
                    <div className="song-inline__info">
                      <p className="song-inline__info--title">{song.title}</p>
                      <p className="song-inline__info--artist">{song.artist}</p>
                    </div>
                  </div>
                  <div className="song-options">
                    <DropdownButton
                      id="dropdown-options"
                      key="left"
                      drop="left"
                      title={<FontAwesomeIcon icon={faEllipsisH} />}
                    >
                      <OptionsList />
                    </DropdownButton>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentIndex: state.player.currentIndex,
  loadedSongs: state.player.loadedSongs,
  playlist: state.playlist,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentIndex: (newIndex) => dispatch(actions.setCurrentIndex(newIndex)),
    setLoadedSongs: (newLoadedSongs) =>
      dispatch(actions.setLoadedSongs(newLoadedSongs)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
