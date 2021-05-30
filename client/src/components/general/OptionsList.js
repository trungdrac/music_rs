import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { setListPlaying, setCurrentIndex } from "../../actions/playerAction";
import { setLikedSongCount } from "../../actions/songAction";
import { setMyPlaylistCount } from "../../actions/playlistAction";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faHeart,
  faInfoCircle,
  faLink,
  faClipboardList,
  faPlus,
  faStepForward,
  faTrashAlt,
  faChevronRight,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import toast from "../../helpers/toast";
import { convertTZ } from "../../helpers/convertTime";
import handleKeyboardEvent from "../../helpers/handleKeyboardEvent";
import debounce from "../../helpers/debounce";
import { setFilterResult } from "../../actions/searchAction";

class OptionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      showPlaylistModal: false,
      showEditModal: false,
      showDeleteModal: false,
      listPlaylist: [],
      songs: [],
    };
    this.editFormRef = React.createRef();
  }

  componentDidMount() {
    this.getLike();
    if (this.props.playlist) this.setState({ songs: this.props.playlist.song });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.likedSongCount !== this.props.likedSongCount ||
      prevProps.currentSongId !== this.props.currentSongId
    )
      this.getLike();
  }

  getLike = () => {
    if (this.props.song) {
      const songId = this.props.song._id;
      const { user } = this.props;
      if (user.userToken) {
        axios
          .get(`/interaction/detail?user=${user.userId}&song=${songId}`, {
            headers: {
              Authorization: `Bearer ${user.userToken}`,
            },
          })
          .then((res) => this.setState({ like: res.data }))
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
    }
  };

  like = () => {
    const songId = this.props.song._id;
    const { user } = this.props;
    const { likedSongCount } = this.props;
    axios
      .get(`/interaction/like?user=${user.userId}&song=${songId}`, {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      })
      .then((res) => this.setState({ like: res.data }))
      .then(() => {
        if (this.state.like === true)
          this.props.setLikedSongCount(likedSongCount + 1);
        else this.props.setLikedSongCount(likedSongCount - 1);
      })
      .then(() =>
        toast({
          title: "Thành công!",
          message: `Đã ${
            this.state.like ? "thêm vào" : "xóa khỏi"
          } bài hát yêu thích!`,
          type: "success",
        })
      )
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

  getPlaylist = () => {
    const { user } = this.props;
    axios
      .get(`/user/${user.userId}/my-playlist/all`, {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      })
      .then((res) => this.setState({ listPlaylist: res.data }))
      .then(() => this.setState({ showPlaylistModal: true }))
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

  addToPlaylist = (playlistId) => {
    const songId = this.props.song._id;
    const { user } = this.props;
    axios
      .get(`/user/my-playlist/${playlistId}/add/${songId}`, {
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
          this.getPlaylist();
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
  };

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
            e.target[0].value = "";
            this.getPlaylist();
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

  playNext = () => {
    const { currentIndex, listPlaying, song } = this.props;
    const indexExisted = listPlaying.findIndex((item) => item._id === song._id);
    const newList = [...listPlaying];

    if (indexExisted !== -1) {
      if (indexExisted < currentIndex) {
        this.props.setCurrentIndex(currentIndex - 1);
        newList.splice(indexExisted, 1);
        newList.splice(currentIndex, 0, song);
      } else {
        newList.splice(indexExisted, 1);
        newList.splice(currentIndex + 1, 0, song);
      }
    } else {
      newList.splice(currentIndex + 1, 0, song);
    }
    this.props.setListPlaying(newList);
    toast({
      title: "Thành công!",
      message: "Bài hát sẽ được phát tiếp theo!",
      type: "success",
    });
  };

  playLast = () => {
    const { currentIndex, listPlaying, song } = this.props;
    const indexExisted = listPlaying.findIndex((item) => item._id === song._id);
    const newList = [...listPlaying];

    if (indexExisted !== -1) {
      if (indexExisted < currentIndex)
        this.props.setCurrentIndex(currentIndex - 1);
      newList.splice(indexExisted, 1);
    }
    newList.splice(newList.length, 0, song);
    this.props.setListPlaying(newList);
    toast({
      title: "Thành công!",
      message: "Đã thêm vào danh sách chờ phát!",
      type: "success",
    });
  };

  // comment = () => {};

  remove = () => {
    const { currentIndex, listPlaying, song } = this.props;
    const newList = [...listPlaying];
    const songIndex = newList.findIndex((item) => item._id === song._id);
    if (songIndex < currentIndex) this.props.setCurrentIndex(currentIndex - 1);
    newList.splice(songIndex, 1);
    this.props.setListPlaying(newList);
    toast({
      title: "Thành công!",
      message: "Đã xóa khỏi chờ phát!",
      type: "success",
    });
  };

  getInfo = () => {
    if (this.props.song)
      this.props.history.push(`/song/detail/${this.props.song._id}`);
    if (this.props.playlist)
      this.props.history.push(`/playlist/detail/${this.props.playlist._id}`);
  };

  copyLink = () => {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard
          .writeText(
            `${window.location.host}/song/detail/${this.props.song._id}`
          )
          .then(
            () =>
              toast({
                title: "Thành công!",
                message: "Đã copy link vào clipboard!",
                type: "success",
              }),
            () =>
              toast({
                title: "Thất bại!",
                message: "Link chưa được copy!",
                type: "error",
              })
          );
      }
    });
  };

  download = () => {
    const { user, song } = this.props;
    const data = { link: song.url };
    axios
      .post(`/user/download`, data, {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      })
      .then((res) => window.open(res.data))
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

  deleteMyPlaylist = () => {
    if (this.props.playlist) {
      const { playlist, user, myPlaylistCount } = this.props;
      axios
        .get(`/user/my-playlist/delete/${playlist._id}`, {
          headers: {
            Authorization: `Bearer ${user.userToken}`,
          },
        })
        .then((res) => {
          toast({
            title: "Thành công!",
            message: res.data.success,
            type: "success",
          });
          this.props.setMyPlaylistCount(myPlaylistCount - 1);
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

  filter = debounce((e) => {
    axios
      .get(`/search?q=${e.target.value}`)
      .then((res) => this.props.setFilterResult(res.data[0]))
      .catch((error) =>
        toast({
          title: "Thất bại!",
          message: `${
            error.response ? error.response.data.message : "Có lỗi xảy ra!"
          }`,
          type: "error",
        })
      );
  }, 500);

  selectSong = (e) => {
    const selectedNode = e.target.closest(".list-song__item.list-group-item");
    const { id } = selectedNode.dataset;
    let songs = [...this.state.songs];
    const indexExisted = songs.findIndex((item) => item._id === id);

    if (indexExisted === -1) {
      axios
        .get(`/song/detail/${id}`)
        .then((res) => songs.push(res.data))
        .then(() => this.setState({ songs }))
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

  editPlaylist = () => {
    if (this.props.playlist) {
      const form = this.editFormRef.current;
      let songIds = [];
      for (let i = 0; i < form.length; i++) {
        if (form[i].checked) songIds.push(form[i].id);
      }
      const { user, playlist } = this.props;
      axios
        .post(
          `/user/my-playlist/update/${playlist._id}`,
          { songIds },
          {
            headers: {
              Authorization: `Bearer ${user.userToken}`,
            },
          }
        )
        .then((res) => this.setState({ songs: res.data.song }))
        .then(() => {
          toast({
            title: "Thành công!",
            message: "Đã cập nhật playlist!",
            type: "success",
          });
          this.setState({ showEditModal: false });
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
    const { userId } = this.props.user;
    const { like, listPlaylist } = this.state;
    const { filterResult } = this.props;

    return (
      <div className="options-list">
        {this.props.like ? (
          <Dropdown.ItemText className="options-list__item" onClick={this.like}>
            {userId && like === true ? (
              <React.Fragment>
                <div className="option-list__item--icon active">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <span>Bỏ thích</span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="option-list__item--icon">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <span>Yêu thích</span>
              </React.Fragment>
            )}
          </Dropdown.ItemText>
        ) : (
          ""
        )}
        {this.props.addToPlaylist ? (
          <Dropdown.Item
            className="options-list__item"
            onClick={this.getPlaylist}
          >
            <div className="option-list__item--icon">
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <span>Thêm vào playlist</span>
          </Dropdown.Item>
        ) : (
          ""
        )}
        {this.props.playNext ? (
          <Dropdown.Item className="options-list__item" onClick={this.playNext}>
            <div className="option-list__item--icon">
              <FontAwesomeIcon icon={faStepForward} />
            </div>
            <span>Phát tiếp theo</span>
          </Dropdown.Item>
        ) : (
          ""
        )}
        {this.props.playLast ? (
          <Dropdown.Item className="options-list__item" onClick={this.playLast}>
            <div className="option-list__item--icon">
              <FontAwesomeIcon icon={faClipboardList} />
            </div>
            <span>Thêm vào chờ phát</span>
          </Dropdown.Item>
        ) : (
          ""
        )}
        {this.props.remove ? (
          <Dropdown.Item className="options-list__item" onClick={this.remove}>
            <div className="option-list__item--icon">
              <FontAwesomeIcon icon={faTrashAlt} />
            </div>
            <span>Xóa</span>
          </Dropdown.Item>
        ) : (
          ""
        )}
        {/* {this.props.comment ? (
          <Dropdown.Item className="options-list__item" onClick={this.comment}>
            <div className="option-list__item--icon">
              <FontAwesomeIcon icon={faCommentDots} />
            </div>
            <span>Bình luận</span>
          </Dropdown.Item>
        ) : (
          ""
        )} */}
        {this.props.location.pathname === "/user/my-playlist" &&
        this.props.editMyPlaylist ? (
          <Dropdown.Item
            className="options-list__item"
            onClick={() => this.setState({ showEditModal: true })}
          >
            <div className="option-list__item--icon">
              <FontAwesomeIcon icon={faEdit} />
            </div>
            <span>Chỉnh sửa</span>
          </Dropdown.Item>
        ) : (
          ""
        )}
        {this.props.location.pathname === "/user/my-playlist" &&
        this.props.deleteMyPlaylist ? (
          <Dropdown.Item
            className="options-list__item"
            onClick={() => this.setState({ showDeleteModal: true })}
          >
            <div className="option-list__item--icon">
              <FontAwesomeIcon icon={faTrashAlt} />
            </div>
            <span>Xóa playlist</span>
          </Dropdown.Item>
        ) : (
          ""
        )}
        {this.props.info ? (
          <Dropdown.Item className="options-list__item" onClick={this.getInfo}>
            <div className="option-list__item--icon">
              <FontAwesomeIcon icon={faInfoCircle} />
            </div>
            <span>Chi tiết</span>
          </Dropdown.Item>
        ) : (
          ""
        )}
        {this.props.copyLink ? (
          <Dropdown.ItemText
            className="options-list__item"
            onClick={this.copyLink}
          >
            <div className="option-list__item--icon">
              <FontAwesomeIcon icon={faLink} />
            </div>
            <span>Sao chép link</span>
          </Dropdown.ItemText>
        ) : (
          ""
        )}
        {this.props.download ? (
          <Dropdown.Item className="options-list__item" onClick={this.download}>
            <div className="option-list__item--icon">
              <FontAwesomeIcon icon={faDownload} />
            </div>
            <span>Tải xuống</span>
          </Dropdown.Item>
        ) : (
          ""
        )}

        {/* Playlist modal */}
        <Modal
          show={this.state.showPlaylistModal}
          onHide={() => this.setState({ showPlaylistModal: false })}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="bg-light">
            <h5 className="mb-0">Chọn playlist muốn thêm!</h5>
          </Modal.Header>
          <Modal.Body className="playlist-modal-body bg-light">
            <div className="list-playlist-modal">
              <ul className="list-group list-group-flush">
                {listPlaylist.length === 0 ? (
                  <span className="text-center font-weight-light mt-5">
                    <i>Bạn chưa có playlist nào!</i>
                  </span>
                ) : (
                  listPlaylist.map((playlist) => (
                    <li
                      key={playlist._id}
                      className="list-playlist-item list-group-item"
                      onClick={() => this.addToPlaylist(playlist._id)}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6>{`${playlist.title} (${playlist.song.length})`}</h6>
                          <span>{`Cập nhật: ${convertTZ(
                            playlist.updatedAt
                          )}`}</span>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
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

        {/* Edit my playlist modal */}
        <Modal
          show={this.state.showEditModal}
          onHide={() => this.setState({ showEditModal: false })}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="bg-light">
            <h5 className="mb-0">Chỉnh sửa playlist</h5>
          </Modal.Header>
          <Modal.Body className="playlist-modal-body bg-light">
            <div className="m-3">
              <input
                type="text"
                placeholder="Nhập tên bài hát..."
                className="filter-input bg-light form-control"
                onChange={this.filter}
                onFocus={() =>
                  window.removeEventListener("keydown", handleKeyboardEvent)
                }
                onBlur={(e) => {
                  this.props.setFilterResult([]);
                  e.target.value = "";
                  window.addEventListener("keydown", handleKeyboardEvent);
                }}
              />

              <div className="filter-suggest box-shadow">
                <ul className="list-group list-group-flush">
                  {filterResult.length !== 0 ? (
                    <React.Fragment>
                      {filterResult.map((song) => (
                        <li
                          className="list-song__item list-group-item"
                          key={song._id}
                          onMouseDown={this.selectSong}
                          data-id={song._id}
                        >
                          <div className="search-suggest__item">
                            <div
                              className="search-suggest__item--img"
                              style={{
                                backgroundImage: `url(${song.image})`,
                              }}
                            ></div>
                            <p className="search-suggest__item--info">
                              {song.title}
                            </p>
                          </div>
                        </li>
                      ))}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
            <div className="m-3">
              <form
                ref={this.editFormRef}
                method="POST"
                id="edit-playlist-form"
                className="list-playlist-modal mb-3 d-flex flex-column"
              >
                {this.props.playlist ? (
                  <React.Fragment>
                    {this.state.songs.map((song) => (
                      <Form.Check
                        type="checkbox"
                        className="pl-5 pr-5 pt-3"
                        key={song._id}
                        id={song._id}
                        label={song.title}
                        defaultChecked
                      />
                    ))}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </form>
              <button
                className="form-submit mt-auto"
                onClick={this.editPlaylist}
              >
                Lưu thay đổi
              </button>
            </div>
          </Modal.Body>
        </Modal>

        {/* Confirm delete modal */}
        <Modal
          show={this.state.showDeleteModal}
          onHide={() => this.setState({ showDeleteModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn xóa playlist?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showDeleteModal: false })}
            >
              Trở lại
            </Button>
            <Button variant="danger" onClick={this.deleteMyPlaylist}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentIndex: state.player.currentIndex,
  listPlaying: state.player.listPlaying,
  user: state.user,
  likedSongCount: state.song.likedSongCount,
  myPlaylistCount: state.playlist.myPlaylistCount,
  filterResult: state.search.filterResult,
  currentSongId: state.player.currentSongId,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
  setListPlaying: (listPlaying) => dispatch(setListPlaying(listPlaying)),
  setLikedSongCount: (count) => dispatch(setLikedSongCount(count)),
  setMyPlaylistCount: (count) => dispatch(setMyPlaylistCount(count)),
  setFilterResult: (result) => dispatch(setFilterResult(result)),
});

const OptionsListWithRouter = withRouter(OptionsList);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsListWithRouter);
