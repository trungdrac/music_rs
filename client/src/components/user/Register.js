import React, { Component } from "react";
import { Link } from "react-router-dom";
import Validator from "../../helpers/validator";

class Register extends Component {
  componentDidMount() {
    Validator({
      form: "#register-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [
        Validator.isRequired("#username"),
        Validator.isRequired("#email"),
        Validator.isRequired("#password"),
        Validator.isRequired("#password_confirmation"),
        Validator.isEmail("#email"),
        Validator.minLength("#password", 6),
        Validator.isConfirmed(
          "#password_confirmation",
          () => document.querySelector("#register-form #password").value,
          "Mật khẩu nhập lại không chính xác"
        ),
      ],
      onSubmit(data) {
        // Call API
        console.log(data);
      },
    });
  }

  render() {
    return (
      <div className="auth">
        <form
          action="true"
          method="POST"
          className="form box-shadow"
          id="register-form"
        >
          <div className="d-flex align-items-center justify-content-around">
            <h3 className="heading">Đăng ký</h3>
            <Link to="/">
              <img src={"/images/logos/logo.svg"} alt="logo-app" />
            </Link>
          </div>
          <div className="spacer" />
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Tên đăng nhập
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Nhập tên đăng nhập"
              className="form-control"
            />
            <span className="form-message" />
          </div>
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
          <div className="d-flex justify-content-center mt-3">
            <span className="auth__options">Đã có tài khoản?</span>
            <Link to="/login" className="auth__options ml-2 text-info">
              Đăng nhập ngay!
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
