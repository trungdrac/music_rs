import React, { Component } from "react";
import { connect } from "react-redux";
import SongCard from "../song/SongCard";
import Chart from "../song/Chart";
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
    if (!recommendation)
      return (
        <React.Fragment>
          <p className="mt-5 pt-3 mb-5 text-danger text-center">
            Dữ liệu nghe nhạc của bạn chưa đủ để sử dụng tính năng này, tiếp tục
            nghe nhạc để chúng tôi có thể hiểu bạn nhiều hơn!
          </p>
          <Chart />
        </React.Fragment>
      );

    return (
      <div className="section">
        <div className="heading">
          <div className="d-flex align-items-end justify-content-between">
            <h4 className="mb-0 p-2 rounded bg-light box-shadow">Gợi ý cho bạn</h4>
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
        <div className="row">
          {recommendation.map((song) => (
            <SongCard key={song._id} item={song} />
          ))}
        </div>
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
