import React, { Component } from "react";
import Section from "../general/Section";

class PlaylistDetail extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row section text-center text-lg-left">
          <div className="col-xl-3 col-lg-4 col-sm-5">
            <img
              src={
                "https://avatar-ex-swe.nixcdn.com/song/2021/03/08/1/3/2/2/1615183865420_300.jpg"
              }
              alt=""
              className="img-detail box-shadow"
            />
          </div>
          <div className="col-xl-9 col-lg-8 col-sm-7">
            <div className="row pt-5">
              <div className="col-xl-8 col-lg-6">
                <h5>Shack your butty</h5>
                <p>Gerrina Linda</p>
                <div className="mt-4">
                  <a
                    href="/"
                    className="btn btn-pill btn-air btn-bold btn-danger"
                  >
                    Play
                  </a>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Thể loại</th>
                      <td>Âu Mỹ</td>
                    </tr>
                    <tr>
                      <th></th>
                      <td>Pop</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="header-table-song">Danh sách bài hát</div>
        <div className="table-song box-shadow section">
          <table className="table table-borderless table-striped">
            <thead>
              <tr className="table-secondary">
                <th scope="col">TIÊU ĐỀ</th>
                <th scope="col">NGHỆ SỸ</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
              <tr className="spacer" />
            </thead>
            <tbody>
              <tr className="table-song__row">
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr className="spacer" />
              <tr className="table-song__row">
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr className="spacer"></tr>
              <tr className="table-song__row">
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
              <tr className="spacer" />
            </tbody>
          </table>
        </div>
        <Section />
      </React.Fragment>
    );
  }
}

export default PlaylistDetail;
