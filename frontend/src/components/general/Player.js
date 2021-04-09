import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { msToISO } from "../../helpers/convertTime";
import * as playerActions from "../../actions/playerAction";
import * as playlistActions from "../../actions/playlistAction";
import RightSidebar from "./RightSidebar";
import OptionsList from "./OptionsList";
import { DropdownButton } from "react-bootstrap";
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

    //audio pause when component did mount
    this.props.pauseAudio();

    // load config
    if (audio !== null) {
      audio.currentTime = this.props.currentTime;
      this.repeatRef.current.classList.toggle("active", this.props.isRepeat);
      this.randomRef.current.classList.toggle("active", this.props.isRandom);
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isShowPlayer) this.props.showPlayer();

    if (prevProps.currentSongId !== this.props.currentSongId) {
      this.audioRef.current.play();
    }
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

    //set duration
    this.props.setDuration(audio.duration);

    //set current song
    const currentSongId = this.props.playlist.song[this.props.currentIndex]._id;
    this.props.setCurrentSong(currentSongId);

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
      this.props.setCurrentIndex(newIndex);
      this.props.setLoadedSongs(newLoadedSongs);
    }
  };

  handleNext = () => {
    const newLoadedSongs = this.props.loadedSongs;
    if (this.props.isRandom) {
      this.playRandom();
    } else {
      const newIndex =
        (this.props.currentIndex + 1) % this.props.playlist.song.length;
      const promise = new Promise((resolve) => {
        this.props.setCurrentIndex(newIndex);
        resolve();
      });
      promise.then(() => {
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
      newIndex = Math.floor(Math.random() * this.props.playlist.song.length);
    } while (newIndex === this.props.currentIndex);
    const promise = new Promise((resolve) => {
      this.props.setCurrentIndex(newIndex);
      resolve();
    });
    promise.then(() => {
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
    const {
      playlist,
      isFirstSong,
      isPlaying,
      currentIndex,
      progressPercent,
      currentTime,
      duration,
    } = this.props;

    if (!this.props.isShowPlayer) {
      return "";
    }
    return (
      <div className="player box-shadow">
        <div className="player__song">
          <Link to="/">
            <div
              className="player__song--img"
              ref={this.songImgRef}
              style={{
                backgroundImage: `url(${playlist.song[currentIndex].image})`,
              }}
            ></div>
          </Link>
          <div className="player__song--info d-none d-sm-block">
            <p className="player-song-title">
              <Link to="/">{playlist.song[currentIndex].title}</Link>
            </p>
            <p className="player-song-artist">
              {playlist.song[currentIndex].artist.map((artist, index) => (
                <Link to="/" key={artist._id}>
                  {index > 0 && ", "}
                  {artist.name}
                </Link>
              ))}
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
            {isFirstSong ? (
              <div className="control__btn disabled">
                <FontAwesomeIcon icon={faStepBackward} />
              </div>
            ) : (
              <div className="control__btn" onClick={this.handlePrev}>
                <FontAwesomeIcon icon={faStepBackward} />
              </div>
            )}
            <div className="btn-toggle-play" onClick={this.handlePlayPause}>
              {isPlaying ? (
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
              src={playlist.song[currentIndex].url}
              onLoadedData={this.handleLoadedData}
              onPlay={this.handlePlay}
              onPause={this.handlePause}
              onTimeUpdate={this.handleTimeUpdate}
              onEnded={this.handleEnded}
            />
            <div className="progress-time">{msToISO(currentTime)}</div>
            <input
              className="progress"
              type="range"
              ref={this.progressRef}
              value={progressPercent}
              step={1}
              min={0}
              max={100}
              onChange={this.handleChange}
            />
            <div className="progress-time">{msToISO(duration)}</div>
          </div>
        </div>
        <div className="player__options d-none d-md-flex">
          <DropdownButton
            id="dropdown-options"
            key="left"
            drop="left"
            title={<FontAwesomeIcon icon={faEllipsisV} />}
          >
            <OptionsList />
          </DropdownButton>
          <label htmlFor="list-songs-checkbox" className="option__btn">
            <FontAwesomeIcon icon={faMusic} />
          </label>
          <input
            type="checkbox"
            hidden
            className="list-songs-input"
            id="list-songs-checkbox"
          />
          <RightSidebar playlist={playlist.song} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isShowPlayer: state.player.isShowPlayer,
  isFirstSong: state.player.isFirstSong,
  isPlaying: state.player.isPlaying,
  isRandom: state.player.isRandom,
  isRepeat: state.player.isRepeat,
  currentIndex: state.player.currentIndex,
  currentSongId: state.player.currentSongId,
  progressPercent: state.player.progressPercent,
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  loadedSongs: state.player.loadedSongs,
  playlist: state.playlist,
});

const mapDispatchToProps = (dispatch) => {
  return {
    //player
    showPlayer: () => dispatch(playerActions.showPlayer()),
    playAudio: () => dispatch(playerActions.playAudio()),
    pauseAudio: () => dispatch(playerActions.pauseAudio()),
    setCurrentTime: (newTime) =>
      dispatch(playerActions.setCurrentTime(newTime)),
    setCurrentSong: (currentSongId) =>
      dispatch(playerActions.setCurrentSong(currentSongId)),
    setProgressPercent: (newPercent) =>
      dispatch(playerActions.setProgressPercent(newPercent)),
    setCurrentIndex: (newIndex) =>
      dispatch(playerActions.setCurrentIndex(newIndex)),
    setDuration: (newDuration) =>
      dispatch(playerActions.setDuration(newDuration)),
    setIsFirstSongTrue: () => dispatch(playerActions.setIsFirstSongTrue()),
    setIsFirstSongFalse: () => dispatch(playerActions.setIsFirstSongFalse()),
    setLoadedSongs: (newLoadedSongs) =>
      dispatch(playerActions.setLoadedSongs(newLoadedSongs)),
    toggleRepeat: () => dispatch(playerActions.toggleRepeat()),
    toggleRandom: () => dispatch(playerActions.toggleRandom()),

    //playlist
    setPlaylist: (playlist) => dispatch(playlistActions.setPlaylist(playlist)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
