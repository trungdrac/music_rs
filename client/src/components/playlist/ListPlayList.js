import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setPlaylistArea } from "../../actions/playlistAction";
import MyPagination from "../general/MyPagination";
import PlaylistCard from "../playlist/PlaylistCard";
import Blank from "../general/Blank";
import { NUMBER_OF_ITEM_PER_PAGE } from "../../constants/Config";

class ListPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageNums: null,
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
          `Lỗi: ${
            error.response.data.message
              ? JSON.stringify(error.response.data.message)
              : ""
          }`
        )
      );

    axios
      .get(`/playlist/${areaId}/count`)
      .then((res) =>
        this.setState({
          pageNums: Math.ceil(res.data / NUMBER_OF_ITEM_PER_PAGE),
        })
      )
      .catch((error) =>
        alert(
          `Lỗi: ${
            error.response.data.message
              ? JSON.stringify(error.response.data.message)
              : ""
          }`
        )
      );
  }

  render() {
    if (this.state.isLoading || this.state.pageNums === null) return "";
    const { playlistArea } = this.props;
    if (playlistArea.length === 0) return <Blank />;

    return (
      <React.Fragment>
        <div className="row">
          {playlistArea.map((playlist) => (
            <PlaylistCard key={playlist._id} item={playlist} />
          ))}
        </div>
        <MyPagination
          pageNums={this.state.pageNums}
          history={this.props.history}
        />
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
