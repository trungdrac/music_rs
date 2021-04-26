import React, { Component } from "react";
import { connect } from "react-redux";
import { setSongs } from "../../actions/songAction";
import axios from "axios";
import SongCard from "./SongCard";

class Section extends Component {
  componentDidMount() {
    axios.get("/song").then((res) => {
      this.props.setSongs(res.data);
    }).catch(console.error);
  }
  render() {
    return (
      <div className="section">
        <div className="heading">
          <div className="d-flex flex-wrap align-items-end">
            <div className="flex-grow-1">
              <h4>Top Charts</h4>
              <p>Listen top chart</p>
            </div>
            <a
              href="songs.html"
              className="btn btn-sm btn-pill btn-air btn-primary"
            >
              View All
            </a>
          </div>
          <hr />
        </div>
        <div className="row">
          {this.props.songs.map((song) => (
            <SongCard key={song._id} item={song} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  songs: state.song.songs,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSongs: (songs) => dispatch(setSongs(songs)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Section);