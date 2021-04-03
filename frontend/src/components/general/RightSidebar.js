import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/playerAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

class RightSidebar extends Component {
  constructor(props) {
    super(props);
    this.songs = [
      {
        title: "I love you Mummy 0",
        artist: "Gerrina Linda",
        path: "./audio/ringtone-1.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/5/1/b/8/51b83f6216d3752b5251159c930dcb8d.jpg",
      },
      {
        title: "Kill this love 1",
        artist: "Black Pink",
        path: "./audio/ringtone-2.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/5/1/b/8/51b83f6216d3752b5251159c930dcb8d.jpg",
      },
      {
        title: "Do it your way (female) 2",
        artist: "Zunira Willy & Nutty Nina",
        path: "./audio/ringtone-3.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/5/1/b/8/51b83f6216d3752b5251159c930dcb8d.jpg",
      },
      {
        title: "Say yes 3",
        artist: "Johnny Marro",
        path: "./audio/ringtone-4.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/5/1/b/8/51b83f6216d3752b5251159c930dcb8d.jpg",
      },
    ];
  }
  pickSong = (e) => {
    const songNode = e.target.closest(".list-song__item:not(.active)");
    const songOption = e.target.closest(".song-options");
    if (songNode) {
      const newLoadedSongs = this.props.loadedSongs;
      const newIndex = Number(songNode.dataset.index);
      const promise = new Promise((resolve) => {
        this.props.setCurrentIndex(newIndex);
        resolve();
      });
      promise.then(() => {
        newLoadedSongs.push(this.props.currentIndex);
        this.props.setLoadedSongs(newLoadedSongs);
      });
    }
    if (songOption) {
      console.log(songOption);
    }
  };

  render() {
    return (
      <div className="right-sidebar">
        <div className="right-sidebar__header">Danh sách phát</div>
        <div className="right-sidebar__body">
          <ul
            className="list-group list-group-flush"
            onClick={(e) => this.pickSong(e)}
          >
            {this.songs.map((song, index) => {
              return (
                <li
                  className={`list-song__item list-group-item ${
                    index === this.props.currentIndex ? "active" : ""
                  }`}
                  key={index}
                  data-index={index}
                >
                  <div className="song-inline">
                    <div
                      className="song-inline__img"
                      style={{
                        backgroundImage: `url(${song.image})`,
                      }}
                    ></div>
                    <div className="song-inline__info">
                      <p className="song-inline__info--title">{song.title}</p>
                      <p className="song-inline__info--artist">{song.artist}</p>
                    </div>
                  </div>
                  <div className="song-options">
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentIndex: state.player.currentIndex,
  loadedSongs: state.player.loadedSongs,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentIndex: (newIndex) => dispatch(actions.setCurrentIndex(newIndex)),
    setLoadedSongs: (newLoadedSongs) =>
      dispatch(actions.setLoadedSongs(newLoadedSongs)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
