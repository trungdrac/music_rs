import React, { Component } from "react";
import { connect } from "react-redux";
import { msToISO } from "../../helpers/convertTime";
import * as actions from "../../actions/playerAction";
import RightSidebar from "./RightSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faPause,
  faPlay,
  faRandom,
  faRedo,
  faStepForward,
  faEllipsisV,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

class Player extends Component {
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
    this.audioRef = React.createRef();
    this.songImgRef = React.createRef();
    this.progressRef = React.createRef();
    this.repeatRef = React.createRef();
    this.randomRef = React.createRef();
  }

  componentDidMount() {
    const audio = this.audioRef.current;
    window.onkeydown = (e) => {
      switch (e.keyCode) {
        case 32:
          e.preventDefault();
          this.handlePlayPause();
          break;
        case 37:
          audio.currentTime -= 5;
          break;
        case 39:
          audio.currentTime += 5;
          break;
        default:
          break;
      }
    };

    this.props.pauseAudio();

    //load first song to loadedSongs
    if (this.props.loadedSongs.length === 0) {
      this.props.setLoadedSongs([this.props.currentIndex]);
    }

    // load config
    audio.currentTime = this.props.currentTime;
    this.repeatRef.current.classList.toggle("active", this.props.isRepeat);
    this.randomRef.current.classList.toggle("active", this.props.isRandom);
  }

  handlePlayPause = () => {
    const audio = this.audioRef.current;
    if (this.props.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  handlePlay = () => {
    const promise = new Promise((resolve) => {
      this.props.playAudio();
      resolve();
    });
    promise.then(() => this.songImgRef.current.classList.add("spin"));
  };

  handlePause = () => {
    const promise = new Promise((resolve) => {
      this.props.pauseAudio();
      resolve();
    });
    promise.then(() => this.songImgRef.current.classList.remove("spin"));
  };

  handleTimeUpdate = () => {
    const audio = this.audioRef.current;
    let newPercent = 0;
    //update current time and progress
    if (audio.duration) {
      newPercent = Math.ceil((audio.currentTime / audio.duration) * 100);
    }
    this.props.setCurrentTime(audio.currentTime);
    this.props.setProgressPercent(newPercent);
  };

  //for seeking
  handleChange = () => {
    const audio = this.audioRef.current;
    const progress = this.progressRef.current;
    const seekTime = (audio.duration * progress.value) / 100;
    audio.currentTime = seekTime;
  };

  handleLoadedData = () => {
    const audio = this.audioRef.current;

    //get current time and duration
    this.props.setCurrentTime(audio.currentTime);
    this.props.setDuration(audio.duration);

    // disabled & active prev button
    this.props.loadedSongs.length === 1
      ? this.props.setIsFirstSongTrue()
      : this.props.setIsFirstSongFalse();
  };

  handlePrev = () => {
    let newLoadedSongs = this.props.loadedSongs;
    let newIndex;
    if (newLoadedSongs.length > 1) {
      newLoadedSongs.pop();
      newIndex = newLoadedSongs[newLoadedSongs.length - 1];
      const promise = new Promise((resolve) => {
        this.props.setCurrentIndex(newIndex);
        this.props.setLoadedSongs(newLoadedSongs);
        resolve();
      });
      promise.then(() => this.audioRef.current.play());
    }
  };

  handleNext = () => {
    const newLoadedSongs = this.props.loadedSongs;
    if (this.props.isRandom) {
      this.playRandom();
    } else {
      const newIndex = (this.props.currentIndex + 1) % this.songs.length;
      const promise = new Promise((resolve) => {
        this.props.setCurrentIndex(newIndex);
        resolve();
      });
      promise.then(() => {
        this.audioRef.current.play();
        newLoadedSongs.push(this.props.currentIndex);
      });
    }
    this.props.setLoadedSongs(newLoadedSongs);
  };

  handleRepeat = () => {
    const promise = new Promise((resolve) => {
      this.props.toggleRepeat();
      resolve();
    });
    promise.then(() =>
      this.repeatRef.current.classList.toggle("active", this.props.isRepeat)
    );
  };

  handleRandom = () => {
    const promise = new Promise((resolve) => {
      this.props.toggleRandom();
      resolve();
    });
    promise.then(() =>
      this.randomRef.current.classList.toggle("active", this.props.isRandom)
    );
  };

  playRandom = () => {
    let newLoadedSongs = this.props.loadedSongs;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.props.currentIndex);
    const promise = new Promise((resolve) => {
      this.props.setCurrentIndex(newIndex);
      resolve();
    });
    promise.then(() => {
      this.audioRef.current.play();
      newLoadedSongs.push(this.props.currentIndex);
    });
  };

  handleEnded = () => {
    if (this.props.isRepeat) {
      this.audioRef.current.play();
    } else {
      this.handleNext();
    }
  };

  render() {
    return (
      <div className="player">
        <div className="player__song">
          <a href="/">
            <div
              className="player__song--img"
              ref={this.songImgRef}
              style={{
                backgroundImage: `url(${
                  this.songs[this.props.currentIndex].image
                })`,
              }}
            ></div>
          </a>
          <div className="player__song--info d-none d-sm-block">
            <p className="player-song-title">
              {this.songs[this.props.currentIndex].title}
            </p>
            <p className="player-song-artist">
              {this.songs[this.props.currentIndex].artist}
            </p>
          </div>
        </div>
        <div className="player__controls">
          <div className="control-wrapper">
            <div
              className="control__btn"
              ref={this.repeatRef}
              onClick={this.handleRepeat}
            >
              <FontAwesomeIcon icon={faRedo} />
            </div>
            {this.props.isFirstSong ? (
              <div className="control__btn disabled">
                <FontAwesomeIcon icon={faStepBackward} />
              </div>
            ) : (
              <div className="control__btn" onClick={this.handlePrev}>
                <FontAwesomeIcon icon={faStepBackward} />
              </div>
            )}
            <div className="btn-toggle-play" onClick={this.handlePlayPause}>
              {this.props.isPlaying ? (
                <FontAwesomeIcon icon={faPause} />
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
            </div>
            <div className="control__btn" onClick={this.handleNext}>
              <FontAwesomeIcon icon={faStepForward} />
            </div>
            <div
              className="control__btn"
              ref={this.randomRef}
              onClick={this.handleRandom}
            >
              <FontAwesomeIcon icon={faRandom} />
            </div>
          </div>
          <div className="progress-wrapper">
            <audio
              ref={this.audioRef}
              src={this.songs[this.props.currentIndex].path}
              onLoadedData={this.handleLoadedData}
              onPlay={this.handlePlay}
              onPause={this.handlePause}
              onTimeUpdate={this.handleTimeUpdate}
              onEnded={this.handleEnded}
            />
            <div className="progress-time">
              {msToISO(this.props.currentTime)}
            </div>
            <input
              className="progress"
              type="range"
              ref={this.progressRef}
              value={this.props.progressPercent}
              step={1}
              min={0}
              max={100}
              onChange={this.handleChange}
            />
            <div className="progress-time">{msToISO(this.props.duration)}</div>
          </div>
        </div>
        <div className="player__options d-none d-md-flex">
          <div className="option__btn">
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
          <label htmlFor="list-songs-checkbox" className="option__btn">
            <FontAwesomeIcon icon={faMusic} />
          </label>
          <input
            type="checkbox"
            hidden
            className="list-songs-input"
            id="list-songs-checkbox"
          />
          <RightSidebar />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFirstSong: state.player.isFirstSong,
  isPlaying: state.player.isPlaying,
  isRandom: state.player.isRandom,
  isRepeat: state.player.isRepeat,
  currentIndex: state.player.currentIndex,
  progressPercent: state.player.progressPercent,
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  loadedSongs: state.player.loadedSongs,
});

const mapDispatchToProps = (dispatch) => {
  return {
    playAudio: () => dispatch(actions.playAudio()),
    pauseAudio: () => dispatch(actions.pauseAudio()),
    setCurrentTime: (newTime) => dispatch(actions.setCurrentTime(newTime)),
    setProgressPercent: (newPercent) =>
      dispatch(actions.setProgressPercent(newPercent)),
    setCurrentIndex: (newIndex) => dispatch(actions.setCurrentIndex(newIndex)),
    setDuration: (newDuration) => dispatch(actions.setDuration(newDuration)),
    setIsFirstSongTrue: () => dispatch(actions.setIsFirstSongTrue()),
    setIsFirstSongFalse: () => dispatch(actions.setIsFirstSongFalse()),
    setLoadedSongs: (newLoadedSongs) =>
      dispatch(actions.setLoadedSongs(newLoadedSongs)),
    toggleRepeat: () => dispatch(actions.toggleRepeat()),
    toggleRandom: () => dispatch(actions.toggleRandom()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
