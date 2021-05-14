import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setMyPlaylist } from "../../actions/playlistAction";
import PlaylistCard from "../playlist/PlaylistCard";
import MyPagination from "../general/MyPagination";
import Blank from "../general/Blank";
import { NUMBER_OF_ITEM_PER_PAGE } from "../../constants/Config";
import toast from "../../helpers/toast";

class MyPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageNums: null,
      count: null,
    };
  }

  getMyPlaylist = () => {
    const { user } = this.props;
    const { search } = this.props.history.location;
    const query = new URLSearchParams(search);

    function getPlaylist() {
      return axios.get(
        `/user/${user.userId}/my-playlist?page=${query.get("page")}`,
        {
          headers: {
            Authorization: `Bearer ${user.userToken}`,
          },
        }
      );
    }

    function getCount() {
      return axios.get(`/user/${user.userId}/my-playlist/count`, {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      });
    }

    Promise.all([getPlaylist(), getCount()])
      .then((results) => {
        const myPlaylist = results[0].data;
        const count = results[1].data;
        this.props.setMyPlaylist(myPlaylist);
        this.setState({
          pageNums: Math.ceil(count / NUMBER_OF_ITEM_PER_PAGE),
          count,
        });
      })
      .then(() => this.setState({ isLoading: false }))
      .catch((error) =>
        toast({
          title: "Thất bại!",
          message: `${
            error.response.data.message
              ? error.response.data.message
              : "Có lỗi xảy ra!"
          }`,
          type: "error",
        })
      );
  };

  componentDidMount() {
    this.getMyPlaylist();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.myPlaylistCount !== this.props.myPlaylistCount)
      this.getMyPlaylist();
  }

  render() {
    if (this.state.isLoading || this.state.pageNums === null) return "";
    const { myPlaylist } = this.props;

    return (
      <div className="section">
        <div className="heading">
          <div className="d-flex align-items-end justify-content-between">
            <h4 className="mb-0 p-2 rounded box-shadow">Playlist của bạn</h4>
            <p className="p-2 rounded box-shadow">
              {this.state.count} playlists
            </p>
          </div>
          <hr />
        </div>
        {myPlaylist.length === 0 ? (
          <Blank />
        ) : (
          <React.Fragment>
            <div className="row">
              {myPlaylist.map((playlist) => (
                <PlaylistCard key={playlist._id} item={playlist} />
              ))}
            </div>
            <MyPagination
              pageNums={this.state.pageNums}
              history={this.props.history}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  myPlaylist: state.playlist.myPlaylist,
  user: state.user,
  myPlaylistCount: state.playlist.myPlaylistCount,
});

const mapDispatchToProps = (dispatch) => ({
  setMyPlaylist: (playlists) => dispatch(setMyPlaylist(playlists)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPlaylist);
