import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Player from "../general/Player";
import ListCard from "../homepage/ListCard";

class SongDetails extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="container-fruit">
            <div className="row section text-center text-md-left">
              <div className="col-xl-3 col-lg-4 col-sm-5">
                <img
                  src={
                    "https://avatar-ex-swe.nixcdn.com/song/2021/03/08/1/3/2/2/1615183865420_300.jpg"
                  }
                  alt=""
                  className="rounded box-shadow"
                />
              </div>
              <div className="col-xl-9 col-lg-8 col-sm-7">
                <div className="row pt-4">
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
            <div className="lyrics box-shadow section">
              <div className="lyrics__header">Lời bài hát</div>
              <hr />
              <div className="lyrics__content mt-2 mb-2">
                <p>
                  Người đi m&agrave; chẳng n&oacute;i một lời
                  <br />
                  Để anh chơi vơi giữa d&ograve;ng đời
                  <br />
                  Lời y&ecirc;u nay sao qu&aacute; xa x&ocirc;i
                  <br />
                  Lời thương giờ n&agrave;y cũng lặng tr&ocirc;i
                  <br />
                  <br />
                  Nhận tin em sắp sống b&ecirc;n người
                  <br />
                  M&agrave; em thương y&ecirc;u đến cuối đời
                  <br />
                  L&ograve;ng anh như đau thắt em ơi
                  <br />
                  L&agrave;m sao để lệ th&ocirc;i ngừng rơi.
                  <br />
                  <br />
                  H&ocirc;m nay, em hạnh ph&uacute;c rồi, em đ&atilde; b&ecirc;n
                  người, m&agrave; l&ograve;ng em y&ecirc;u.
                  <br />
                  Em qu&ecirc;n, c&acirc;u hẹn c&acirc;u thề, em hứa với người
                  cả đời thương em.
                  <br />
                  <br />
                  Em ơi! Chữ t&igrave;nh ngắn th&ocirc;i
                  <br />
                  M&agrave; sao anh phải k&eacute;o theo một đời
                  <br />
                  Em ơi! Em giờ c&oacute; đ&ocirc;i
                  <br />
                  C&ograve;n anh th&igrave; phải lẻ loi thật rồi
                  <br />
                  <br />
                  Khi xưa, hứa chẳng c&aacute;ch xa
                  <br />
                  Gừng cay muối mặn chẳng ham lụa l&agrave;
                  <br />
                  H&ocirc;m nay, &aacute;o hồng gấm hoa
                  <br />
                  T&igrave;nh xưa người trả, hết anh thật &agrave;?
                </p>
              </div>
            </div>
            <ListCard />
          </div>
        </div>
        <Player />
      </div>
    );
  }
}

export default SongDetails;
