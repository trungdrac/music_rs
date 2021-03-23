import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faPause, faPlay, faRandom, faRedo, faStepForward, faEllipsisV, faMusic } from '@fortawesome/free-solid-svg-icons';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            songs: [{
                path: "./audio/ringtone-1.mp3"
            },
            {
                path: "./audio/ringtone-2.mp3"
            }]

        };
        this.audio = React.createRef();
        this.songImg = React.createRef();
    };

    handleTogglePlay = () => {
        this.setState({ isPlaying: !this.state.isPlaying });
        this.songImg.current.classList.toggle("spin");
        if (this.state.isPlaying) {
            this.audio.current.pause();

        } else {
            this.audio.current.play();
        }
    };

    render() {
        return (
            <div className="player">
                <div className="player__song">
                    <a href="/">
                        <div className="player__song--img" ref={this.songImg} style={{ backgroundImage: "url(https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/5/1/b/8/51b83f6216d3752b5251159c930dcb8d.jpg)" }} >
                        </div>
                    </a>
                    <div className="player__song--info hide-on-xs">
                        <div className="player-song-name">
                            <a href="/">Willow</a>
                        </div>
                        <div className="player-song-artist">
                            <a href="/">Taylor Swift</a>
                        </div>
                    </div>
                </div>
                <div className="player__controls">
                    <div className="control">
                        <div className="control__btn btn-repeat">
                            <FontAwesomeIcon icon={faRedo} />
                        </div>
                        <div className="control__btn btn-prev">
                            <FontAwesomeIcon icon={faStepBackward} />
                        </div>
                        <div className="control__btn btn-toggle-play" onClick={this.handleTogglePlay}>
                            {this.state.isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                        </div>
                        <div className="control__btn btn-next">
                            <FontAwesomeIcon icon={faStepForward} />
                        </div>
                        <div className="control__btn btn-random">
                            <FontAwesomeIcon icon={faRandom} />
                        </div>
                    </div>
                    <div>
                        <input id="progress" className="progress" type="range" defaultValue={0} step={1} min={0} max={100} />
                        <audio ref={this.audio} src={"./audio/ringtone-1.mp3"} />
                    </div>
                </div>
                <div className="player__options hide-on-sm">
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
