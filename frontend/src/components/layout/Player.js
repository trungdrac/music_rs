import React, { Component } from "react";
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
    this.state = {
      isFirstSong: false,
      isPlaying: false,
      isRandom: false,
      isRepeat: false,
      currentIndex: 0,
      progressPercent: 0,
      loadedSongs: [],
      config: JSON.parse(localStorage.getItem("musicRS")) || {},
    };
    this.setConfig = (key, value) => {
      this.state.config[key] = value;
      localStorage.setItem("musicRS", JSON.stringify(this.state.config));
    };
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
    //load current song to loadedSongs
    this.setState({ loadedSongs: [this.state.currentIndex] });

    //load config
    this.setState(
      {
        isRepeat: this.state.config.isRepeat,
        isRandom: this.state.config.isRandom,
      },
      () => {
        this.repeatRef.current.classList.toggle("active", this.state.isRepeat);
        this.randomRef.current.classList.toggle("active", this.state.isRandom);
      }
    );
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
    let newPercent = 0;
    //update current time and progress
    const newTime = new Date(audio.currentTime * 1000)
      .toISOString()
      .substr(14, 5);
    if (audio.duration) {
      newPercent = Math.ceil((audio.currentTime / audio.duration) * 100);
    }
    this.setState({ currentTime: newTime, progressPercent: newPercent });
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
    const newTime = new Date(audio.currentTime * 1000)
      .toISOString()
      .substr(14, 5);
    const newDuration = new Date(audio.duration * 1000)
      .toISOString()
      .substr(14, 5);
    this.setState({ currentTime: newTime, duration: newDuration });

    // disabled & active prev button
    if (this.state.loadedSongs.length === 1) {
      this.setState({ isFirstSong: true });
    } else {
      this.setState({ isFirstSong: false });
    }
  };

  handlePrev = () => {
    let loadedIndexs = this.state.loadedSongs;
    loadedIndexs.pop();
    const newIndex = loadedIndexs[loadedIndexs.length - 1];
    this.setState({ currentIndex: newIndex, loadedSongs: loadedIndexs }, () => {
      this.audioRef.current.play();
      // console.log(this.state.loadedSongs);
    });
  };

  handleNext = () => {
    const loadedIndexs = this.state.loadedSongs;
    if (this.state.isRandom) {
      this.playRandom();
    } else {
      const newIndex = (this.state.currentIndex + 1) % this.songs.length;
      this.setState({ currentIndex: newIndex }, () => {
        this.audioRef.current.play();
        loadedIndexs.push(this.state.currentIndex);
      });
    }
    this.setState({ loadedSongs: loadedIndexs });
  };

  handleRepeat = () => {
    this.setState({ isRepeat: !this.state.isRepeat }, () => {
      this.repeatRef.current.classList.toggle("active", this.state.isRepeat);
      this.setConfig("isRepeat", this.state.isRepeat);
    });
  };

  handleRandom = () => {
    this.setState({ isRandom: !this.state.isRandom }, () => {
      this.randomRef.current.classList.toggle("active", this.state.isRandom);
      this.setConfig("isRandom", this.state.isRandom);
    });
  };

  playRandom = () => {
    let loadedIndexs = this.state.loadedSongs;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.state.currentIndex);
    this.setState({ currentIndex: newIndex }, () => {
      this.audioRef.current.play();
      loadedIndexs.push(this.state.currentIndex);
    });
  };

  handleEnded = () => {
    if (this.state.isRepeat) {
      this.audioRef.current.play();
    } else {
      this.handleNext();
    }
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
            <p className="player-song-title">
              {this.songs[this.state.currentIndex].title}
            </p>
            <p className="player-song-artist">
              {this.songs[this.state.currentIndex].artist}
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
            {this.state.isFirstSong ? (
              <div className="control__btn disabled">
                <FontAwesomeIcon icon={faStepBackward} />
              </div>
            ) : (
              <div className="control__btn" onClick={this.handlePrev}>
                <FontAwesomeIcon icon={faStepBackward} />
              </div>
            )}
            <div className="btn-toggle-play" onClick={this.handlePlayPause}>
              {this.state.isPlaying ? (
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
              src={this.songs[this.state.currentIndex].path}
              onLoadedData={this.handleLoadedData}
              onPlay={this.handlePlay}
              onPause={this.handlePause}
              onTimeUpdate={this.handleTimeUpdate}
              onEnded={this.handleEnded}
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

export default Player;
