import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("邮箱"),
    password: Joi.string().required().min(5).label("密码"),
    name: Joi.string().required().label("用户名"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div
        className="w-100 d-flex  justify-content-center"
        style={{ marginTop: "5em" }}
      >
        <div className="w-50">
          <h1>注册</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "邮箱")}
            {this.renderInput("password", "密码", "password")}
            {this.renderInput("name", "用户名")}
            {this.renderButton("注册")}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
