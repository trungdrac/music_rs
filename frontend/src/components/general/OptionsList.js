import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faInfoCircle,
  faLink,
  faListUl,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default class OptionsList extends Component {
  render() {
    return (
      <div className="options-list">
        <Dropdown.Item href="#/action-2" className="options-list__item">
          <div className="option-list__item--icon">
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <span>Thêm vào playlist</span>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2" className="options-list__item">
          <div className="option-list__item--icon">
            <FontAwesomeIcon icon={faListUl} />
          </div>
          <span>Thêm vào chờ phát</span>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3" className="options-list__item">
          <div className="option-list__item--icon">
            <FontAwesomeIcon icon={faDownload} />
          </div>
          <span>Tải xuống</span>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-5" className="options-list__item">
          <div className="option-list__item--icon">
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
          <span>Chi tiết</span>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-4" className="options-list__item">
          <div className="option-list__item--icon">
            <FontAwesomeIcon icon={faLink} />
          </div>
          <span>Sao chép link</span>
        </Dropdown.Item>
      </div>
    );
  }
}
