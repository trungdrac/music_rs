import React, { Component } from "react";
import { connect } from "react-redux";
import Blank from "../general/Blank";
import SongCard from "../song/SongCard";

class History extends Component {
  render() {
    const { historyListen } = this.props;

    return (
      <div className="section">
        <div className="heading">
          <div className="d-flex align-items-end justify-content-between">
            <h4 className="mb-0 p-2 rounded box-shadow">
              Bài hát nghe gần đây
            </h4>
            <p className="p-2 rounded box-shadow">
              {historyListen.length} bài hát
            </p>
          </div>
          <hr />
        </div>
        {historyListen.length === 0 ? (
          <Blank />
        ) : (
          <div className="row">
            {historyListen.map((song) => (
              <SongCard key={song._id} item={song} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  historyListen: state.song.historyListen,
});

export default connect(mapStateToProps)(History);
