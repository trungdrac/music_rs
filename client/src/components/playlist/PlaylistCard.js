import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setListPlaying,
  setCurrentIndex,
  playAudio,
  toggleRandom,
} from "../../actions/playerAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlay } from "@fortawesome/free-solid-svg-icons";
import OptionsList from "../general/OptionsList";
import { DropdownButton } from "react-bootstrap";

class PlaylistCard extends Component {
  playPlaylist = () => {
    const listPlaying = this.props.item.song;
    this.props.setListPlaying(listPlaying);
    this.props.setCurrentIndex(0);
    if (this.props.isRandom) this.props.toggleRandom();
  };
  render() {
    const { item, currentSongId } = this.props;
    return (
      <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mt-3">
        <div className="card border-0 h-100">
          <div className="playlist-bar-1" />
          <div className="playlist-bar-2" />
          <div className="card-img box-shadow rounded">
            <Link to={`/playlist/detail/${item._id}`}>
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
                  key={item._id}
                  drop="left"
                  title={<FontAwesomeIcon icon={faEllipsisV} />}
                >
                  <OptionsList playlist={item} info copyLink />
                </DropdownButton>

                <div className="card-img__overlay">
                  <div className="btn-toggle-play" onClick={this.playPlaylist}>
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentSongId: state.player.currentSongId,
  isRandom: state.player.isRandom,
});

const mapDispatchToProps = (dispatch) => ({
  setListPlaying: (listPlaying) => dispatch(setListPlaying(listPlaying)),
  setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
  playAudio: () => dispatch(playAudio()),
  toggleRandom: () => dispatch(toggleRandom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCard);
