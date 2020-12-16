import React, { Component } from "react";
import config from "../../config";
import KaimahiContext from "../../KaimahiContext";

class LoginPage extends Component {
  static contextType = KaimahiContext;
  state = {
    email: "test@test.com",
    password: "12345",
  };

  loginAction = (e) => {
    e.preventDefault();
    fetch(`${config.CONFIG_API_ENDPOINT}/login`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        delete data.password;
        // store in context
        this.context.setCurrentUser(data);
        // store in sessionStorage
        sessionStorage.setItem("currentUser", JSON.stringify(data));
        window.location.href = "/dashboard";
      })
      .catch((e) => {
        console.error(e);
      });
  };

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <form className="loginForm" onSubmit={this.loginAction}>
        <h1>Login</h1>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            required
            onChange={this.changeValue}
            type="email"
            name="email"
            value={this.state.email}
            id="email"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            required
            onChange={this.changeValue}
            type="password"
            value={this.state.password}
            name="password"
            id="password"
          />
        </div>
        <div className="loginFormButton">
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}

export default LoginPage;
