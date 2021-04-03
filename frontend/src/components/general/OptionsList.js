import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faHeart as fasHeart,
  faInfoCircle,
  faPlus,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

export default class OptionsList extends Component {
  render() {
    return (
      <div>
        <Dropdown.Item href="#/action-1">
          <FontAwesomeIcon icon={farHeart} />
          <FontAwesomeIcon icon={fasHeart} />
          <span>Yêu thích</span>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
          <FontAwesomeIcon icon={faPlus} />
          <span>Thêm vào playlist</span>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3">
          <FontAwesomeIcon icon={faDownload} />
          <span>Tải xuống</span>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-4">
          <FontAwesomeIcon icon={faShareAlt} />
          <span>Chia sẻ</span>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-5">
          <FontAwesomeIcon icon={faInfoCircle} />
          <span>Chi tiết</span>
        </Dropdown.Item>
      </div>
    );
  }
}
