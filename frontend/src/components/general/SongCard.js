import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlay } from "@fortawesome/free-solid-svg-icons";
import OptionsList from "./OptionsList";
import { ButtonGroup, DropdownButton } from "react-bootstrap";

export default class SongCard extends Component {
  render() {
    return (
      <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
        <div className="card border-0 h-100">
          <div className="card-img">
            <img
              src={
                "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/5/1/b/8/51b83f6216d3752b5251159c930dcb8d.jpg"
              }
              className="card-img__song card-img-top rounded"
              alt="..."
            />
            <DropdownButton
              className="btn-ellipsis"
              id="dropdown-options"
              as={ButtonGroup}
              key="up"
              drop="up"
              variant="secondary"
              title={<FontAwesomeIcon icon={faEllipsisV} />}
            >
              <OptionsList />
            </DropdownButton>
            <div className="card-img__overlay btn-toggle-play">
              <FontAwesomeIcon icon={faPlay} />
            </div>
          </div>
          <div className="card-body">
            <h6 className="card-title">Title</h6>
            <h6 className="card-text">Artist</h6>
          </div>
        </div>
      </div>
    );
  }
}
