import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  setMyPlaylist,
  setMyPlaylistCount,
} from "../../actions/playlistAction";
import PlaylistCard from "../playlist/PlaylistCard";
import MyPagination from "../general/MyPagination";
import Blank from "../general/Blank";
import { NUMBER_OF_ITEM_PER_PAGE } from "../../constants/Config";
import toast from "../../helpers/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import handleKeyboardEvent from "../../helpers/handleKeyboardEvent";

class MyPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageNums: null,
      count: null,
      showCreatePlaylist: false,
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
            error.response ? error.response.data.message : "Có lỗi xảy ra!"
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

  createPlaylist = (e) => {
    e.preventDefault();
    const { user } = this.props;
    const data = { [e.target[0].name]: e.target[0].value };
    if (data.title === "")
      toast({
        title: "Thất bại!",
        message: "Tên playlist không được rỗng!",
        type: "error",
      });
    else {
      axios
        .post(`/user/${user.userId}/my-playlist/create`, data, {
          headers: {
            Authorization: `Bearer ${user.userToken}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            toast({
              title: "Thành công!",
              message: res.data.success,
              type: "success",
            });
            this.setState({ showCreatePlaylist: false });
            this.props.setMyPlaylistCount(this.props.myPlaylistCount + 1);
          }
          if (res.data.error)
            toast({
              title: "Thất bại!",
              message: res.data.error,
              type: "error",
            });
        })
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
  };

  render() {
    if (this.state.isLoading || this.state.pageNums === null) return "";
    const { myPlaylist } = this.props;

    return (
      <div className="section">
        <div className="heading">
          <div className="d-flex align-items-end justify-content-between">
            <h4 className="mb-0 p-2 rounded bg-light box-shadow">
              Playlist của bạn
            </h4>
            <button
              className="btn btn-danger box-shadow"
              onClick={() => this.setState({ showCreatePlaylist: true })}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              <span> Tạo mới</span>
            </button>
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

        {/* Create playlist modal */}
        <Modal
          show={this.state.showCreatePlaylist}
          onHide={() => this.setState({ showCreatePlaylist: false })}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="bg-light">
            <h5 className="mb-0">Tạo playlist mới</h5>
          </Modal.Header>
          <Modal.Body className="playlist-modal-body bg-light">
            <form
              onSubmit={this.createPlaylist}
              method="POST"
              id="create-playlist-form"
            >
              <div className="d-flex">
                <div className="flex-grow-1">
                  <input
                    name="title"
                    type="text"
                    placeholder="Nhập tên playlist cần tạo!"
                    className="h-100 w-100 bg-light form-control"
                    onFocus={() =>
                      window.removeEventListener("keydown", handleKeyboardEvent)
                    }
                    onBlur={() =>
                      window.addEventListener("keydown", handleKeyboardEvent)
                    }
                  />
                </div>
                <button className="btn btn-info ml-2">Tạo playlist</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
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
  setMyPlaylistCount: (count) => dispatch(setMyPlaylistCount(count)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPlaylist);
