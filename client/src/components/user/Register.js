import React, { Component } from "react";

class Register extends Component {
  render() {
    return (
      <div className="auth">
        <form action="true" method="POST" className="form box-shadow" id="register-form">
          <h3 className="heading">Thành viên đăng ký</h3>
          <p className="desc">Cùng nhau học lập trình miễn phí tại F8 ❤️</p>
          <div className="spacer" />
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Tên đăng nhập
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="VD: Sơn Đặng"
              className="form-control"
            />
            <span className="form-message" />
          </div>
          {/* <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="VD: email@domain.com"
              className="form-control"
            />
            <span className="form-message" />
          </div> */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation" className="form-label">
              Nhập lại mật khẩu
            </label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Nhập lại mật khẩu"
              type="password"
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <button className="form-submit">Đăng ký</button>
        </form>
      </div>
    );
  }
}

export default Register;
