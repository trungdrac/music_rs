import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Validator from "../../helpers/validator";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccessed: false,
    };
  }
  componentDidMount() {
    const resetToken = this.props.match.params.token;
    Validator({
      form: "#reset-password-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [
        Validator.isRequired("#password"),
        Validator.isRequired("#password_confirmation"),
        Validator.minLength("#password", 6),
        Validator.isConfirmed(
          "#password_confirmation",
          () => document.querySelector("#reset-password-form #password").value,
          "Mật khẩu nhập lại không chính xác"
        ),
      ],
      onSubmit: (data) => {
        delete data.password_confirmation;
        data.resetToken = resetToken;
        axios
          .post("/user/reset-password", data)
          .then(() => {
            this.setState({ isSuccessed: true });
          })
          .catch((error) =>
            alert(
              `Lỗi: ${
                error.response.data.message
                  ? JSON.stringify(error.response.data.message)
                  : ""
              }`
            )
          );
      },
    });
  }

  render() {
    return (
      <div className="auth">
        {this.state.isSuccessed ? (
          <form className="form box-shadow">
            <div className="d-flex align-items-center justify-content-around">
              <h3 className="heading">Cập nhật mật khẩu</h3>
              <Link to="/">
                <img src={"/images/logos/logo.svg"} alt="logo-app" />
              </Link>
            </div>
            <div className="spacer" />
            <div className="p-4 bg-light">
              <span>
                Bạn đã thay đổi mật khẩu thành công. Hãy đăng nhập ngay để có
                trải nghiệm tốt nhất tại MusicRS!
              </span>
            </div>
            <div className="mt-5">
              <Link to="/login" className="form-submit">
                Đăng nhập
              </Link>
            </div>
          </form>
        ) : (
          <form
            action="true"
            method="POST"
            className="form box-shadow"
            id="reset-password-form"
          >
            <div className="d-flex align-items-center justify-content-around">
              <h3 className="heading">Thay đổi mật khẩu</h3>
              <Link to="/">
                <img src={"/images/logos/logo.svg"} alt="logo-app" />
              </Link>
            </div>
            <div className="spacer" />
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
            <button className="form-submit">Tạo mật khẩu</button>
          </form>
        )}
      </div>
    );
  }
}

export default ResetPassword;
