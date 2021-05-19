import React, { Component } from "react";
import { connect } from "react-redux";
import SongCard from "../song/SongCard";
import Blank from "../general/Blank";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import {
  setCurrentIndex,
  setListPlaying,
  toggleRandom,
} from "../../actions/playerAction";

class Recommendation extends Component {
  playAll = () => {
    const listPlaying = this.props.recommendation;
    this.props.setListPlaying(listPlaying);
    this.props.setCurrentIndex(0);
    if (this.props.isRandom) this.props.toggleRandom();
  };
  render() {
    const { recommendation } = this.props;

    return (
      <div className="section">
        <div className="heading">
          <div className="d-flex align-items-end justify-content-between">
            <h4 className="mb-0 p-2 rounded box-shadow">Có thể bạn quan tâm</h4>
            <button
              className="btn btn-danger box-shadow"
              onClick={this.playAll}
            >
              <FontAwesomeIcon icon={faPlay} />
              <span> PHÁT TẤT CẢ</span>
            </button>
          </div>
          <hr />
        </div>
        {recommendation.length === 0 ? (
          <Blank />
        ) : (
          <React.Fragment>
            <div className="row">
              {recommendation.map((song) => (
                <SongCard key={song._id} item={song} />
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendation: state.song.recommendation,
  isPlaying: state.player.isPlaying,
  isRandom: state.player.isRandom,
});

const mapDispatchToProps = (dispatch) => ({
  setListPlaying: (playlist) => dispatch(setListPlaying(playlist)),
  setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
  toggleRandom: () => dispatch(toggleRandom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
