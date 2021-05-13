import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setLikedSong } from "../../actions/songAction";
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
    };
  }

  componentDidMount() {
    const { user } = this.props;
    const { search } = this.props.history.location;
    const query = new URLSearchParams(search);

    function getLikedSong() {
      return axios.get(`/user/${user.userId}/liked?page=${query.get("page")}`, {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      });
    }

    function getCount() {
      return axios.get(`/user/${user.userId}/liked/count`, {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      });
    }

    Promise.all([getLikedSong(), getCount()])
      .then((results) => {
        const likedSong = results[0].data;
        const count = results[1].data;
        this.props.setLikedSong(likedSong);
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
  }

  render() {
    if (this.state.isLoading || this.state.pageNums === null) return "";
    const { likedSong } = this.props;
    if (likedSong.length === 0) return <Blank />;

    return (
      <div className="section">
        <div className="heading">
          <div className="d-flex align-items-end justify-content-between">
            <h4 className="mb-0 p-2 rounded box-shadow">Bài hát yêu thích</h4>
            <p className="p-2 rounded box-shadow">{this.state.count} bài hát</p>
          </div>
          <hr />
        </div>
        <div className="row">
          {likedSong.map((song) => (
            <SongCard key={song._id} item={song} />
          ))}
        </div>
        <MyPagination
          pageNums={this.state.pageNums}
          history={this.props.history}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  likedSong: state.song.likedSong,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setLikedSong: (songs) => dispatch(setLikedSong(songs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LikedSong);
