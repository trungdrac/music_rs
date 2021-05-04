import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setPlaylistArea } from "../../actions/playlistAction";
import MyPagination from "../general/MyPagination";
import PlaylistCard from "../playlist/PlaylistCard";
import Blank from "../general/Blank";

class ListPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { areaId } = this.props.match.params;
    const { search } = this.props.history.location;
    const query = new URLSearchParams(search);

    axios
      .get(`/playlist/${areaId}?page=${query.get("page")}`)
      .then((res) => this.props.setPlaylistArea(res.data))
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
    const { playlistArea } = this.props;
    if (playlistArea.length === 0) return <Blank />;

    return (
      <React.Fragment>
        <div className="row">
          {playlistArea.map((playlist) => (
            <PlaylistCard key={playlist._id} item={playlist} />
          ))}
        </div>
        <MyPagination />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  playlistArea: state.playlist.playlistArea,
});

const mapDispatchToProps = (dispatch) => ({
  setPlaylistArea: (playlists) => dispatch(setPlaylistArea(playlists)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPlaylist);
