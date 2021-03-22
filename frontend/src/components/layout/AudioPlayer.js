import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPause, faPlay, faRandom, faRedo, faStepForward } from '@fortawesome/free-solid-svg-icons';

class AudioPlayer extends Component {
    render() {
        return (
            <div className="player">
                <div className="player__song">

                </div>
                <div className="player__controls">
                        <div className="btn btn-repeat">
                            <FontAwesomeIcon icon={faRedo} />
                        </div>
                        <div className="btn btn-prev">
                            <FontAwesomeIcon icon={faBackward} />
                        </div>
                        <div className="btn btn-toggle-play">
                            <FontAwesomeIcon icon={faPause} className="icon-pause" />
                            <FontAwesomeIcon icon={faPlay} className="icon-play" />
                        </div>
                        <div className="btn btn-next">
                            <FontAwesomeIcon icon={faStepForward} />
                        </div>
                        <div className="btn btn-random">
                            <FontAwesomeIcon icon={faRandom} />
                        </div>
                        <input id="progress" className="progress" type="range" defaultValue={0} step={1} min={0} max={100} />
                        <audio id="audio" src />
                </div>
                <div className="player__options">

                </div>
            </div>
        );
    }
}

export default AudioPlayer;