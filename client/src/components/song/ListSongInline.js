import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setListPlaying,
  setCurrentIndex,
  playAudio,
} from "../../actions/playerAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faHeadphonesAlt,
} from "@fortawesome/free-solid-svg-icons";
import OptionsList from "../general/OptionsList";
import { DropdownButton, ListGroup } from "react-bootstrap";

class ListSongInline extends Component {
  playAudio = (e) => {
    const songNode = e.target.closest(".list-song-inline__item");
    const songOption = e.target.closest(".song-options");
    const songTitle = e.target.closest("#song-title");
    const songArtist = e.target.closest("#song-artist");
    if (songNode && !songTitle && !songArtist && !songOption) {
      const songIndex = Number(songNode.dataset.index);
      const listPlaying = [this.props.item[songIndex]];
      this.props.setListPlaying(listPlaying);
      this.props.setCurrentIndex(0);
    }
  };

  render() {
    const { item } = this.props;
    return (
      <ListGroup>
        {item.map((song, index) => (
          <ListGroup.Item
            className="list-song-inline__item mb-1 border-0 bg-light"
            key={song._id}
            onClick={this.playAudio}
            data-index={index}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="song-inline">
                <div className="ml-2 mr-4 text-primary">{index + 1}</div>
                <div
                  className="song-inline__img"
                  style={{
                    backgroundImage: `url(${song.image})`,
                  }}
                ></div>
                <div className="list-song-inline__info">
                  <h6 className="list-song-inline__info--title">
                    <Link id="song-title" to={`/song/detail/${song._id}`}>
                      {song.title}
                    </Link>
                  </h6>
                  <h6 className="list-song-inline__info--artist">
                    {song.artist.map((artist, index) => (
                      <Link
                        id="song-artist"
                        to={`/artist/detail/${artist._id}`}
                        key={artist._id}
                      >
                        {index > 0 && ", "}
                        {artist.name}
                      </Link>
                    ))}
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faHeadphonesAlt} />
                <div className="ml-2 pt-1">{`${Number(
                  song.chartcount / 1000
                ).toFixed(2)}K`}</div>
                <div className="song-options">
                  <DropdownButton
                    id="dropdown-options"
                    drop="left"
                    title={<FontAwesomeIcon icon={faEllipsisV} />}
                  >
                    <OptionsList
                      song={song}
                      like
                      addToPlaylist
                      playNext
                      playLast
                      info
                      copyLink
                      download
                    />
                  </DropdownButton>
                </div>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  currentSongId: state.player.currentSongId,
});

const mapDispatchToProps = (dispatch) => ({
  setListPlaying: (listPlaying) => dispatch(setListPlaying(listPlaying)),
  setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
  playAudio: () => dispatch(playAudio()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListSongInline);
