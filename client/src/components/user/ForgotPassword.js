import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Validator from "../../helpers/validator";
import toast from "../../helpers/toast";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailMessage: "",
      isSended: false,
      email: "",
    };
  }
  componentDidMount() {
    Validator({
      form: "#forgot-password-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [Validator.isRequired("#email"), Validator.isEmail("#email")],
      onSubmit: (data) => {
        if (!this.state.emailMessage) {
          this.setState({ email: data.email });
          axios
            .post("/user/forgot-password", data)
            .then(() => {
              this.setState({ isSended: true });
            })
            .catch((error) =>
              toast({
                title: "Thất bại!",
                message: `${
                  error.response.data.message
                    ? error.response.data.message
                    : "Có lỗi xảy ra!"
                }`,
                type: "error",
              })
            );
        }
      },
    });
  }

  checkExisted = (e) => {
    let data = {};
    const emailFormMessage = document.querySelector(
      "input#email + span.form-message"
    ).innerText;
    if (!emailFormMessage) data[e.target.name] = e.target.value;
    axios
      .post("/user/register/existed", data)
      .then((res) => {
        const result = res.data;
        if (!result.message)
          this.setState({
            emailMessage: "Email không khớp với bất kỳ tài khoản nào!",
          });
      })
      .catch((error) =>
        toast({
          title: "Thất bại!",
          message: `${
            error.response.data.message
              ? error.response.data.message
              : "Có lỗi xảy ra!"
          }`,
          type: "error",
        })
      );
  };

  render() {
    return (
      <div className="auth">
        {this.state.isSended ? (
          <form className="form box-shadow">
            <div className="d-flex align-items-center justify-content-around">
              <h3 className="heading">Kiểm tra email</h3>
              <Link to="/">
                <img src={"/images/logos/logo.svg"} alt="logo-app" />
              </Link>
            </div>
            <div className="spacer" />
            <div className="p-4 bg-light">
              <span>
                Chúng tôi đã gửi yêu cầu khôi phục mật khẩu tới{" "}
                <b>{this.state.email}</b>. Vui lòng kiểm tra email và làm theo
                hướng dẫn.
              </span>
            </div>
            <div className="mt-5">
              <Link to="/" className="form-submit">
                Quay về trang chủ
              </Link>
            </div>
          </form>
        ) : (
          <form
            action="true"
            method="POST"
            className="form box-shadow"
            id="forgot-password-form"
          >
            <div className="d-flex align-items-center justify-content-around">
              <h3 className="heading">Khôi phục mật khẩu</h3>
              <Link to="/">
                <img src={"/images/logos/logo.svg"} alt="logo-app" />
              </Link>
            </div>
            <div className="spacer" />
            <div
              className={`form-group ${
                this.state.emailMessage ? "api-invalid" : ""
              }`}
            >
              <label htmlFor="email" className="form-label">
                Email đăng ký tài khoản
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="VD: email@domain.com"
                className="form-control"
                onBlur={this.checkExisted}
                onInput={() => this.setState({ emailMessage: "" })}
              />
              <span className="form-message" />
              <span className="api-message">{this.state.emailMessage}</span>
            </div>
            <button className="form-submit">Khôi phục mật khẩu</button>
            <div className="d-flex justify-content-center mt-3">
              <Link to="/login" className="auth__options text-info">
                Đăng nhập
              </Link>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default ForgotPassword;
