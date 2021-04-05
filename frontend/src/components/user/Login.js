import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="auth">
        <form action method="POST" className="form box-shadow" id="login-form">
          <h3 className="heading">Đăng nhập</h3>
          <p className="desc">Cùng trải nghiệp đày đủ tính năng của MusicRS ❤️</p>
          <div className="spacer" />
          <div className="form-group">
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
          </div>
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
          <button className="form-submit">Đăng nhập</button>
        </form>
      </div>
    );
  }
}

export default Login;
