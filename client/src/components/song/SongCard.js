import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setListPlaying,
  setCurrentIndex,
  playAudio,
} from "../../actions/playerAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlay } from "@fortawesome/free-solid-svg-icons";
import OptionsList from "../general/OptionsList";
import { DropdownButton } from "react-bootstrap";

class SongCard extends Component {
  playAudio = () => {
    const listPlaying = [this.props.item];
    this.props.setListPlaying(listPlaying);
    this.props.setCurrentIndex(0);
  };

  render() {
    const { item, currentSongId } = this.props;
    return (
      <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mt-3">
        <div className="card border-0 h-100">
          <div className="card-img box-shadow rounded">
            <Link to={`/song/detail/${item._id}`}>
              <img
                src={item.image}
                className="card-img-custom card-img-top"
                alt="..."
              />
            </Link>
            {item._id !== currentSongId ? (
              <div>
                <DropdownButton
                  className="btn-ellipsis"
                  id="dropdown-options"
                  drop="left"
                  title={<FontAwesomeIcon icon={faEllipsisV} />}
                >
                  <OptionsList
                    song={item}
                    like
                    addToPlaylist
                    playNext
                    playLast
                    info
                    copyLink
                    download
                  />
                </DropdownButton>

                <div className="card-img__overlay">
                  <div className="btn-toggle-play" onClick={this.playAudio}>
                    <FontAwesomeIcon icon={faPlay} />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="card-body pl-0 pr-0">
            <h6 className="card-title">
              <Link to={`/song/detail/${item._id}`}>{item.title}</Link>
            </h6>
            <h6 className="card-artist">
              {item.artist.map((artist, index) => (
                <Link to={`/artist/detail/${artist._id}`} key={artist._id}>
                  {index > 0 && ", "}
                  {artist.name}
                </Link>
              ))}
            </h6>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SongCard);
