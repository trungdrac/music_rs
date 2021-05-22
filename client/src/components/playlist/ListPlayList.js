import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setPlaylistArea } from "../../actions/playlistAction";
import MyPagination from "../general/MyPagination";
import PlaylistCard from "../playlist/PlaylistCard";
import Blank from "../general/Blank";
import { NUMBER_OF_ITEM_PER_PAGE } from "../../constants/Config";
import toast from "../../helpers/toast";

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

    function getPlaylistArea() {
      return axios.get(`/playlist/${areaId}?page=${query.get("page")}`);
    }

    function getCount() {
      return axios.get(`/playlist/${areaId}/count`);
    }

    Promise.all([getPlaylistArea(), getCount()])
      .then((results) => {
        const playlistArea = results[0].data;
        const count = results[1].data;
        this.props.setPlaylistArea(playlistArea);
        this.setState({
          pageNums: Math.ceil(count / NUMBER_OF_ITEM_PER_PAGE),
        });
      })
      .then(() => this.setState({ isLoading: false }))
      .catch((error) =>
        toast({
          title: "Thất bại!",
          message: `${
            error.response ? error.response.data.message : "Có lỗi xảy ra!"
          }`,
          type: "error",
        })
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
