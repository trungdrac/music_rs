import React, { Component } from "react";
import { connect } from "react-redux";
import * as songActions from "../../actions/songAction";
import callAPI from "../../helpers/callAPI";
import Card from "../general/Card";

class Section extends Component {
  componentDidMount() {
    // get song
    callAPI("GET", "/song").then((res) => {
      this.props.setSong(res.data);
    });
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
            <Card key={song._id} item={song}/>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  songs: state.song,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSong: (song) => dispatch(songActions.setSong(song)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Section);
