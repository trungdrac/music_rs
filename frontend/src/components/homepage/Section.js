import React, { Component } from "react";

class Section extends Component {
  render() {
    return (
      <div>
        <div className="heading">
          <div className="d-flex flex-wrap align-items-end">
            <div className="flex-grow-1">
              <h4>Top Charts</h4>
              <p>Listen top chart</p>
            </div>
            <a
              href="songs.html"
              className="btn btn-sm btn-pill btn-air btn-primary"
            >
              View All
            </a>
          </div>
          <hr />
        </div>
        <div className="row">
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
            <div className="card">
              <img
                src={"./images/cover/large.jpg"}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Title</h5>
                <p className="card-text">
                  Artist
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Section;
