import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div
        className="w-100 d-flex  justify-content-center"
        style={{ marginTop: "5em" }}
      >
        <div className="w-50">
          <h1>登陆</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "邮箱")}
            {this.renderInput("password", "密码", "password")}
            {this.renderButton("登陆")}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
