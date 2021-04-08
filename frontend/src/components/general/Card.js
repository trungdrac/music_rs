import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setPlaylist } from "../../actions/playlistAction";
import { setCurrentIndex } from "../../actions/playerAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlay } from "@fortawesome/free-solid-svg-icons";
import OptionsList from "./OptionsList";
import { DropdownButton } from "react-bootstrap";

class Card extends Component {
  playAudio = () => {
    const playlist = { song: [this.props.item] };
    this.props.setPlaylist(playlist);
    this.props.setCurrentIndex(0);
  };
  render() {
    const { item } = this.props;
    if (!item.artist) item.artist = [];
    return (
      <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
        <div className="card border-0 h-100">
          <div className="card-img">
            <img
              src={item.image}
              className="card-img__song card-img-top rounded"
              alt="..."
            />
            <DropdownButton
              className="btn-ellipsis"
              id="dropdown-options"
              key={item._id}
              drop="left"
              title={<FontAwesomeIcon icon={faEllipsisV} />}
            >
              <OptionsList />
            </DropdownButton>
            <div className="card-img__overlay">
              <div className="btn-toggle-play" onClick={this.playAudio}>
                <FontAwesomeIcon icon={faPlay} />
              </div>
            </div>
          </div>
          <div className="card-body pl-0 pr-0">
            <h6 className="card-title">
              <Link to="/">{item.title}</Link>
            </h6>
            <h6 className="card-artist">
              {item.artist.map((artist, index) => (
                <Link to="/" key={artist._id}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setPlaylist: (playlist) => dispatch(setPlaylist(playlist)),
    setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
  };
};

export default connect(null, mapDispatchToProps)(Card);
