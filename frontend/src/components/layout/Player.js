import React, { Component } from "react";
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
    this.state = {
      isPlaying: false,
      currentIndex: 0,
      progressPercent: 0,
    };
    this.songs = [
      {
        title: "I love you Mummy",
        artist: "Gerrina Linda",
        path: "./audio/ringtone-1.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/5/1/b/8/51b83f6216d3752b5251159c930dcb8d.jpg",
      },
      {
        title: "Kill this love",
        artist: "Black Pink",
        path: "./audio/ringtone-2.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/5/1/b/8/51b83f6216d3752b5251159c930dcb8d.jpg",
      },
      {
        title: "Do it your way (female)",
        artist: "Zunira Willy & Nutty Nina",
        path: "./audio/ringtone-3.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/5/1/b/8/51b83f6216d3752b5251159c930dcb8d.jpg",
      },
      {
        title: "Say yes",
        artist: "Johnny Marro",
        path: "./audio/ringtone-4.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/5/1/b/8/51b83f6216d3752b5251159c930dcb8d.jpg",
      },
    ];
    this.audioRef = React.createRef();
    this.songImgRef = React.createRef();
    this.progressRef = React.createRef();
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
  }

  handlePlayPause = () => {
    const audio = this.audioRef.current;
    if (this.state.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  handlePlay = () => {
    this.setState({ isPlaying: true });
    this.songImgRef.current.classList.add("spin");
  };

  handlePause = () => {
    this.setState({ isPlaying: false });
    this.songImgRef.current.classList.remove("spin");
  };

  handleTimeUpdate = () => {
    const audio = this.audioRef.current;
    let progressPercent = 0;
    //update current time and progress
    const currentTime = new Date(audio.currentTime * 1000)
      .toISOString()
      .substr(14, 5);
    if (audio.duration) {
      progressPercent = Math.ceil((audio.currentTime / audio.duration) * 100);
    }
    this.setState({ currentTime, progressPercent });
  };

  handleChange = () => {
    const audio = this.audioRef.current;
    const progress = this.progressRef.current;
    const seekTime = (audio.duration * progress.value) / 100;
    audio.currentTime = seekTime;
  };

  handleLoadedData = () => {
    const audio = this.audioRef.current;

    //get current time and duration
    const currentTime = new Date(audio.currentTime * 1000)
      .toISOString()
      .substr(14, 5);
    const duration = new Date(audio.duration * 1000)
      .toISOString()
      .substr(14, 5);
    this.setState({ currentTime, duration, progressPercent: 0 });

    //for next and prev
    if (this.state.isPlaying === true) {
      audio.play();
    }
  };

  handlePrev = () => {
    const currentIndex =
      (this.state.currentIndex - 1 + this.songs.length) % this.songs.length;
    this.setState({ currentIndex });
    this.handleLoadedData();
  };

  handleNext = () => {
    const currentIndex = (this.state.currentIndex + 1) % this.songs.length;
    this.setState({ currentIndex });
  };

  handleRepeat = (e) => {
    e.currentTarget.classList.toggle("active");
  };

  handleRandom = (e) => {
    e.currentTarget.classList.toggle("active");
  };

  render() {
    // console.log(this.songs.length);
    return (
      <div className="player">
        <div className="player__song">
          <a href="/">
            <div
              className="player__song--img"
              ref={this.songImgRef}
              style={{
                backgroundImage: `url(${
                  this.songs[this.state.currentIndex].image
                })`,
              }}
            ></div>
          </a>
          <div className="player__song--info d-none d-sm-block">
            <div className="player-song-title">
              <a href="/">{this.songs[this.state.currentIndex].title}</a>
            </div>
            <div className="player-song-artist">
              <a href="/">{this.songs[this.state.currentIndex].artist}</a>
            </div>
          </div>
        </div>
        <div className="player__controls">
          <div className="control-wrapper">
            <div
              className="control__btn btn-repeat"
              onClick={(e) => this.handleRepeat(e)}
            >
              <FontAwesomeIcon icon={faRedo} />
            </div>
            <div className="control__btn btn-prev" onClick={this.handlePrev}>
              <FontAwesomeIcon icon={faStepBackward} />
            </div>
            <div
              className="control__btn btn-toggle-play"
              onClick={this.handlePlayPause}
            >
              {this.state.isPlaying ? (
                <FontAwesomeIcon icon={faPause} />
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
            </div>
            <div className="control__btn btn-next" onClick={this.handleNext}>
              <FontAwesomeIcon icon={faStepForward} />
            </div>
            <div
              className="control__btn btn-random"
              onClick={(e) => this.handleRandom(e)}
            >
              <FontAwesomeIcon icon={faRandom} />
            </div>
          </div>
          <div className="progress-wrapper">
            <audio
              ref={this.audioRef}
              src={this.songs[this.state.currentIndex].path}
              onLoadedData={this.handleLoadedData}
              onPlay={this.handlePlay}
              onPause={this.handlePause}
              onTimeUpdate={this.handleTimeUpdate}
            />
            <div className="progress-time">{this.state.currentTime}</div>
            <input
              className="progress"
              type="range"
              ref={this.progressRef}
              value={this.state.progressPercent}
              step={1}
              min={0}
              max={100}
              onChange={this.handleChange}
            />
            <div className="progress-time">{this.state.duration}</div>
          </div>
        </div>
        <div className="player__options d-none d-md-flex">
          <div className="option-btn btn-ellipsis">
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
          <div className="option-btn btn-music">
            <FontAwesomeIcon icon={faMusic} />
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
