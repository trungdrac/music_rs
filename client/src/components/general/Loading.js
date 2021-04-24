import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="loader">
          <div className="eq">
            <span className="eq-bar eq-bar--1" />
            <span className="eq-bar eq-bar--2" />
            <span className="eq-bar eq-bar--3" />
            <span className="eq-bar eq-bar--4" />
            <span className="eq-bar eq-bar--5" />
            <span className="eq-bar eq-bar--6" />
          </div>
          <span className="loader__text">Đang tải dữ liệu</span>
        </div>
      </div>
    );
  }
}
export default Loading;
