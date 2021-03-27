import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

class RightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
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
  }

  render() {
    return (
      <div className="right-sidebar">
        <div className="right-sidebar__header">Danh sách phát</div>
        <div className="right-sidebar__body" data-scrollable="true">
          <ul className="list-group list-group-flush">
            {this.songs.map((song, index) => {
              return (
                <li className="list-song__item list-group-item" key={index}>
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

export default RightSidebar;
