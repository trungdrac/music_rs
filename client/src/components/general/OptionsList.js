import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { setListPlaying, setCurrentIndex } from "../../actions/playerAction";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faDownload,
  faHeart,
  faInfoCircle,
  faLink,
  faClipboardList,
  faPlus,
  faStepForward,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import toast from "../../helpers/toast";

class OptionsList extends Component {
  constructor(props) {
    super(props);
    this.state = { interaction: {} };
  }
  componentDidMount() {
    const songId = this.props.song._id;
    const { user } = this.props;
    if (user.userId) {
      axios
        .get(`/interaction/detail?user=${user.userId}&song=${songId}`, {
          headers: {
            Authorization: `Bearer ${user.userToken}`,
          },
        })
        .then((res) => this.setState({ interaction: res.data }))
        .catch(() =>
          toast({
            title: "Thất bại!",
            message: "Có lỗi xảy ra!",
            type: "error",
          })
        );
    }
  }

  like = () => {
    const songId = this.props.song._id;
    const { user } = this.props;
    axios
      .get(`/interaction/like?user=${user.userId}&song=${songId}`, {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      })
      .then((res) => this.setState({ interaction: res.data }))
      .then(() =>
        toast({
          title: "Thành công!",
          message: `Đã ${
            this.state.interaction.like ? "thêm vào" : "xóa khỏi"
          } bài hát yêu thích!`,
          type: "success",
        })
      )
      .catch(() =>
        toast({
          title: "Thất bại!",
          message: "Có lỗi xảy ra!",
          type: "error",
        })
      );
  };

  addToPlaylist = () => {};

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

  comment = () => {};

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
    window.open(this.props.song.url);
  };

  render() {
    const { userId } = this.props.user;
    const { interaction } = this.state;

    return (
      <div className="options-list">
        {this.props.like ? (
          <Dropdown.ItemText className="options-list__item" onClick={this.like}>
            <div
              className={`option-list__item--icon ${
                userId && interaction.like === true ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <span>Yêu thích</span>
          </Dropdown.ItemText>
        ) : (
          ""
        )}
        {this.props.addToPlaylist ? (
          <Dropdown.Item
            className="options-list__item"
            onClick={this.addToPlaylist}
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
        {this.props.comment ? (
          <Dropdown.Item className="options-list__item" onClick={this.comment}>
            <div className="option-list__item--icon">
              <FontAwesomeIcon icon={faCommentDots} />
            </div>
            <span>Bình luận</span>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentIndex: state.player.currentIndex,
  listPlaying: state.player.listPlaying,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
  setListPlaying: (listPlaying) => dispatch(setListPlaying(listPlaying)),
});

const OptionsListWithRouter = withRouter(OptionsList);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsListWithRouter);
