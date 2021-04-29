import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { msToISO } from "../../helpers/convertTime";
import * as playerActions from "../../actions/playerAction";
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
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevVolume: 1,
      originIndex: 0,
      originalListPlaying: [],
    };
    this.audioRef = React.createRef();
    this.progressRef = React.createRef();
  }

  componentDidMount() {
    const audio = this.audioRef.current;

    //audio pause when component did mount
    this.props.pauseAudio();

    // load audio status
    if (audio !== null) {
      audio.currentTime = this.props.currentTime;
      audio.volume = this.props.volume;
    }
  }

  componentDidUpdate(prevProps) {
    const audio = this.audioRef.current;

    if (prevProps.currentSongId !== this.props.currentSongId) audio.play();

    if (prevProps.volume !== this.props.volume)
      audio.volume = this.props.volume;
  }

  handlePlayPause = () => {
    const audio = this.audioRef.current;
    if (this.props.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
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
  handleProgress = () => {
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
    const currentSongId = this.props.listPlaying[this.props.currentIndex]._id;
    this.props.setCurrentSongId(currentSongId);
  };

  handlePrev = () => {
    const { currentIndex } = this.props;
    let newIndex;
    if (currentIndex >= 1) {
      newIndex = currentIndex - 1;
      this.props.setCurrentIndex(newIndex);
    }
  };

  handleNext = () => {
    const { currentIndex, listPlaying } = this.props;
    let newIndex;
    if (currentIndex < listPlaying.length - 1) {
      newIndex = currentIndex + 1;
      this.props.setCurrentIndex(newIndex);
    }
  };

  handleRandom = () => {
    const { isRandom, currentIndex, listPlaying } = this.props;
    if (!isRandom) {
      this.setState(
        { originalListPlaying: listPlaying, originIndex: currentIndex },
        () => {
          const listPlayingShuffle = [...listPlaying];
          const currentSong = listPlaying[currentIndex];
          listPlayingShuffle.splice(currentIndex, 1);
          listPlayingShuffle.sort(() => Math.random() - 0.5);
          listPlayingShuffle.unshift(currentSong);
          this.props.setCurrentIndex(0);
          this.props.setListPlaying(listPlayingShuffle);
        }
      );
    } else {
      this.props.setCurrentIndex(this.state.originIndex);
      this.props.setListPlaying(this.state.originalListPlaying);
    }
    this.props.toggleRandom();
  };

  handleVolume = (e) => {
    const newVolume = e.target.valueAsNumber;
    this.audioRef.current.volume = newVolume;
    this.props.setVolume(newVolume);
  };

  handleVolumeBtn = () => {
    const audio = this.audioRef.current;
    if (audio.volume !== 0) {
      this.setState({ prevVolume: audio.volume });
      audio.volume = 0;
    } else {
      audio.volume = this.state.prevVolume;
    }
  };

  handleEnded = () => {
    if (this.props.isRepeat) {
      this.audioRef.current.play();
    } else {
      this.handleNext();
    }
  };

  render() {
    if (this.props.listPlaying.length === 0) return "";

    const {
      listPlaying,
      isPlaying,
      currentIndex,
      currentSongId,
      progressPercent,
      currentTime,
      duration,
      isRepeat,
      isRandom,
    } = this.props;

    const audio = this.audioRef.current;
    let volume = this.props.volume;
    if (audio) volume = audio.volume;

    window.onkeydown = (e) => {
      if (audio !== null) {
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
          case 38:
            e.preventDefault();
            if (audio.volume <= 0.9) audio.volume += 0.1;
            else audio.volume = 1;
            this.props.setVolume(audio.volume);
            break;
          case 40:
            e.preventDefault();
            if (audio.volume >= 0.1) audio.volume -= 0.1;
            else audio.volume = 0;
            this.props.setVolume(audio.volume);
            break;
          default:
            break;
        }
      }
    };

    return (
      <div className="player box-shadow">
        <div className="player__song">
          <Link to={`/song/detail/${currentSongId}`}>
            <div
              className={`player__song--img box-shadow ${
                isPlaying ? "spin" : ""
              }`}
              style={{
                backgroundImage: `url(${listPlaying[currentIndex].image})`,
              }}
            ></div>
          </Link>
          <div className="player__song--info d-none d-sm-block">
            <p className="player-song-title">
              <Link to={`/song/detail/${currentSongId}`}>
                {listPlaying[currentIndex].title}
              </Link>
            </p>
            <p className="player-song-artist">
              {listPlaying[currentIndex].artist.map((artist, index) => (
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
              className={`control__btn ${isRepeat ? "active" : ""}`}
              onClick={() => this.props.toggleRepeat()}
            >
              <FontAwesomeIcon icon={faRedo} />
            </div>
            {currentIndex === 0 ? (
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
              className={`control__btn ${isRandom ? "active" : ""}`}
              onClick={this.handleRandom}
            >
              <FontAwesomeIcon icon={faRandom} />
            </div>
          </div>
          <div className="d-flex align-items-center">
            <audio
              ref={this.audioRef}
              src={listPlaying[currentIndex].url}
              onLoadedData={this.handleLoadedData}
              onPlay={() => this.props.playAudio()}
              onPause={() => this.props.pauseAudio()}
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
              onChange={this.handleProgress}
            />
            <div className="progress-time">{msToISO(duration)}</div>
          </div>
        </div>
        <div className="player__options d-none d-md-flex">
          <div className="d-none d-lg-flex ml-2 mr-2">
            <div className="control__btn" onClick={this.handleVolumeBtn}>
              {volume === 0 ? (
                <FontAwesomeIcon icon={faVolumeMute} />
              ) : (
                <FontAwesomeIcon icon={faVolumeUp} />
              )}
            </div>
            <div className="d-flex align-items-center">
              <input
                className="volume"
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={volume}
                onChange={this.handleVolume}
              />
            </div>
          </div>
          <DropdownButton
            id="dropdown-options"
            key="left"
            drop="left"
            title={<FontAwesomeIcon icon={faEllipsisV} />}
          >
            <OptionsList />
          </DropdownButton>
          <input
            type="checkbox"
            hidden
            className="list-songs-input"
            id="list-songs-checkbox"
          />
          <label htmlFor="list-songs-checkbox" className="control__btn mr-4">
            <FontAwesomeIcon icon={faMusic} />
          </label>
          <RightSidebar listPlaying={listPlaying} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isPlaying: state.player.isPlaying,
  isRandom: state.player.isRandom,
  isRepeat: state.player.isRepeat,
  volume: state.player.volume,
  currentIndex: state.player.currentIndex,
  currentSongId: state.player.currentSongId,
  progressPercent: state.player.progressPercent,
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  listPlaying: state.player.listPlaying,
});

const mapDispatchToProps = (dispatch) => {
  return {
    //player
    playAudio: () => dispatch(playerActions.playAudio()),
    pauseAudio: () => dispatch(playerActions.pauseAudio()),
    setCurrentTime: (newTime) =>
      dispatch(playerActions.setCurrentTime(newTime)),
    setCurrentSongId: (currentSongId) =>
      dispatch(playerActions.setCurrentSongId(currentSongId)),
    setProgressPercent: (newPercent) =>
      dispatch(playerActions.setProgressPercent(newPercent)),
    setCurrentIndex: (newIndex) =>
      dispatch(playerActions.setCurrentIndex(newIndex)),
    setDuration: (newDuration) =>
      dispatch(playerActions.setDuration(newDuration)),
    toggleRepeat: () => dispatch(playerActions.toggleRepeat()),
    toggleRandom: () => dispatch(playerActions.toggleRandom()),
    setVolume: (newVolume) => dispatch(playerActions.setVolume(newVolume)),
    setListPlaying: (listPlaying) =>
      dispatch(playerActions.setListPlaying(listPlaying)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
