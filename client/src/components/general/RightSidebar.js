import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/playerAction";
import OptionsList from "./OptionsList";
import { DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

class RightSidebar extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.currentIndex !== this.props.currentIndex) {
      document
        .querySelector(".list-song__item.active")
        .scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  pickSong = (e) => {
    const songNode = e.target.closest(".list-song__item:not(.active)");
    const songOption = e.target.closest(".song-options");
    if (songNode && !songOption) {
      const newIndex = Number(songNode.dataset.index);
      this.props.setCurrentIndex(newIndex);
    }
  };

  render() {
    const { listPlaying } = this.props;
    return (
      <div className="right-sidebar box-shadow">
        <div className="right-sidebar__header">Danh sách phát</div>
        <div className="right-sidebar__body">
          <ul
            className="list-group list-group-flush"
            onClick={(e) => this.pickSong(e)}
          >
            {listPlaying.map((song, index) => {
              return (
                <li
                  className={`list-song__item list-group-item ${
                    index === this.props.currentIndex ? "active" : ""
                  }`}
                  key={song._id}
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
                      <p className="song-inline__info--artist">
                        {song.artist.map((artist, index) => (
                          <span to="/" key={artist._id}>
                            {index > 0 && ", "}
                            {artist.name}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="song-options">
                    <DropdownButton
                      id="dropdown-options"
                      key="left"
                      drop="left"
                      title={<FontAwesomeIcon icon={faEllipsisH} />}
                    >
                      <OptionsList
                        song={song}
                        addToPlaylist
                        playNext
                        playLast
                        remove
                        comment
                        info
                        copyLink
                        download
                      />
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
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentIndex: (newIndex) => dispatch(actions.setCurrentIndex(newIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
