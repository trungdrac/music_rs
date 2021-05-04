import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

class Blank extends Component {
  render() {
    return (
      <div className="blank">
        <FontAwesomeIcon icon={faBan} className="blank__icon"/>
        <i className="pl-2 pr-2">Không tìm thấy kết quả phù hợp!</i>
      </div>
    );
  }
}

export default Blank;
