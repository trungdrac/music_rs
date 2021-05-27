import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import SongCard from "../song/SongCard";
import MyPagination from "../general/MyPagination";
import Blank from "../general/Blank";
import { NUMBER_OF_ITEM_PER_PAGE } from "../../constants/Config";
import toast from "../../helpers/toast";

class LikedSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageNums: null,
      count: null,
      likedSong: [],
    };
  }

  getLikedSong = () => {
    const { user } = this.props;
    const { search } = this.props.history.location;
    const query = new URLSearchParams(search);

    function getLikedSong() {
      return axios.get(
        `/user/${user.userId}/liked-song?page=${query.get("page")}`,
        {
          headers: {
            Authorization: `Bearer ${user.userToken}`,
          },
        }
      );
    }

    function getCount() {
      return axios.get(`/user/${user.userId}/liked-song/count`, {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      });
    }

    Promise.all([getLikedSong(), getCount()])
      .then((results) => {
        const likedSong = results[0].data;
        const count = results[1].data;
        this.setState({
          likedSong,
          pageNums: Math.ceil(count / NUMBER_OF_ITEM_PER_PAGE),
          count,
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
  };

  componentDidMount() {
    this.getLikedSong();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.likedSongCount !== this.props.likedSongCount)
      this.getLikedSong();
  }

  render() {
    if (this.state.isLoading || this.state.pageNums === null) return "";
    const { likedSong } = this.state;

    return (
      <div className="section">
        <div className="heading">
          <div className="d-flex align-items-end justify-content-between">
            <h4 className="mb-0 p-2 rounded bg-light box-shadow">
              Bài hát yêu thích
            </h4>
            <p className="p-2 rounded bg-light box-shadow">
              {this.state.count} bài hát
            </p>
          </div>
          <hr />
        </div>
        {likedSong.length === 0 ? (
          <Blank />
        ) : (
          <React.Fragment>
            <div className="row">
              {likedSong.map((song) => (
                <SongCard key={song._id} item={song} />
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
  user: state.user,
  likedSongCount: state.song.likedSongCount,
});

export default connect(mapStateToProps)(LikedSong);
