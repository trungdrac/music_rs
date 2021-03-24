import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faPause, faPlay, faRandom, faRedo, faStepForward, faEllipsisV, faMusic } from '@fortawesome/free-solid-svg-icons';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            currentIndex: 0,
        };
        this.songs = [{
            title: "I love you Mummy",
            artist: "Gerrina Linda",
            path: "./audio/ringtone-1.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/5/1/b/8/51b83f6216d3752b5251159c930dcb8d.jpg"
        },
        {
            title: "Kill this love",
            artist: "Black Pink",
            path: "./audio/ringtone-2.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/5/1/b/8/51b83f6216d3752b5251159c930dcb8d.jpg"
        }
        ];
        this.audioRef = React.createRef();
        this.songImgRef = React.createRef();
        this.progressRef = React.createRef();
    };

    componentDidMount() {
        window.onkeydown = (e) => {
            const audio = this.audioRef.current;
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
                default: break;
            }
        }
    }

    handlePlayPause = () => {
        const audio = this.audioRef.current;
        const progress = this.progressRef.current;
        const songImg = this.songImgRef.current;
        if (this.state.isPlaying) {
            audio.pause();

        } else {
            audio.play();
        }
        this.setState({ isPlaying: !this.state.isPlaying });
        songImg.classList.toggle("spin");

        //update progress
        audio.ontimeupdate = () => {
            const progressPercent = Math.ceil(audio.currentTime / audio.duration * 100)
            progress.value = progressPercent;
        }
    };

    setSeekTime = () => {
        const audio = this.audioRef.current;
        const progress = this.progressRef.current;
        const seekTime = audio.duration * progress.value / 100;
        audio.currentTime = seekTime;
    }

    handleRepeat = (e) => {
        e.currentTarget.classList.toggle("active");
    }

    handleRandom = (e) => {
        e.currentTarget.classList.toggle("active");
    }

    render() {
        // console.log(this.audioRef);
        return (
            <div className="player">
                <div className="player__song">
                    <a href="/">
                        <div className="player__song--img" ref={this.songImgRef} style={{ backgroundImage: `url(${this.songs[this.state.currentIndex].image})` }} >
                        </div>
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
                    <div className="control">
                        <div className="control__btn btn-repeat" onClick={(e) => this.handleRepeat(e)}>
                            <FontAwesomeIcon icon={faRedo} />
                        </div>
                        <div className="control__btn btn-prev">
                            <FontAwesomeIcon icon={faStepBackward} />
                        </div>
                        <div className="control__btn btn-toggle-play" onClick={this.handlePlayPause}>
                            {this.state.isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                        </div>
                        <div className="control__btn btn-next">
                            <FontAwesomeIcon icon={faStepForward} />
                        </div>
                        <div className="control__btn btn-random" onClick={(e) => this.handleRandom(e)}>
                            <FontAwesomeIcon icon={faRandom} />
                        </div>
                    </div>
                    <div>
                        <audio ref={this.audioRef} src={this.songs[this.state.currentIndex].path} />
                        <input className="progress" type="range" ref={this.progressRef} defaultValue={0} step={1} min={0} max={100} onChange={this.setSeekTime} />
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
            </div >
        );
    }
}

export default Player;
