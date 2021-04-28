import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setPlaylistArea } from "../../actions/playlistAction";
import MyPagination from "../general/MyPagination";
import PlaylistCard from "../playlist/PlaylistCard";

class ListPlaylist extends Component {
  componentDidMount() {
    const { areaId } = this.props.match.params;

    axios
      .get(`/playlist/${areaId}`)
      .then((res) => this.props.setPlaylistArea(res.data))
      .catch((error) =>
        alert(
          `Lỗi! ${
            error.response.data.message ? error.response.data.message : ""
          }`
        )
      );
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          {this.props.playlistArea.map((playlist) => (
            <PlaylistCard key={playlist._id} item={playlist} />
          ))}
        </div>
        <div className="d-flex justify-content-center mt-2">
          <MyPagination />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  playlistArea: state.playlist.playlistArea,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setPlaylistArea: (playlists) => dispatch(setPlaylistArea(playlists)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListPlaylist);
