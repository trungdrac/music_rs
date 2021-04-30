import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setListPlaying, setCurrentIndex } from "../../actions/playerAction";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faDownload,
  faHeart,
  faInfoCircle,
  faLink,
  faListUl,
  faPlus,
  faStepForward,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

class OptionsList extends Component {
  like = () => {};

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
  };

  comment = () => {};

  remove = () => {
    const { currentIndex, listPlaying, song } = this.props;
    const newList = [...listPlaying];
    const songIndex = newList.findIndex((item) => item._id === song._id);
    if (songIndex < currentIndex) this.props.setCurrentIndex(currentIndex - 1);
    newList.splice(songIndex, 1);
    this.props.setListPlaying(newList);
  };

  getInfo = () => {
    if (this.props.song)
      this.props.history.push(`/song/detail/${this.props.song._id}`);
    if (this.props.playlist)
      this.props.history.push(`/playlist/detail/${this.props.playlist._id}`);
  };

  copyLink = () => {};

  download = () => {
    this.props.history.push(this.props.song.url);
  };

  render() {
    return (
      <div className="options-list">
        {this.props.like ? (
          <Dropdown.Item className="options-list__item" onClick={this.like}>
            <div className="option-list__item--icon">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <span>Yêu thích</span>
          </Dropdown.Item>
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
              <FontAwesomeIcon icon={faListUl} />
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
          <Dropdown.Item className="options-list__item" onClick={this.copyLink}>
            <div className="option-list__item--icon">
              <FontAwesomeIcon icon={faLink} />
            </div>
            <span>Sao chép link</span>
          </Dropdown.Item>
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
    setListPlaying: (listPlaying) => dispatch(setListPlaying(listPlaying)),
  };
};

const OptionsListWithRouter = withRouter(OptionsList);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsListWithRouter);
