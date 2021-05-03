import React, { Component } from "react";
import { connect } from "react-redux";
import { setSongs } from "../../actions/songAction";
import axios from "axios";
import SongCard from "../song/SongCard";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get("/song")
      .then((res) => {
        this.props.setSongs(res.data);
      })
      .then(() => this.setState({ isLoading: false }))
      .catch((error) =>
        alert(
          `Lỗi! ${
            error.response.data.message ? error.response.data.message : ""
          }`
        )
      );
  }
  render() {
    if (this.state.isLoading) return "";

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

const mapDispatchToProps = (dispatch) => ({
  setSongs: (songs) => dispatch(setSongs(songs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);
