import React, { Component } from "react";
import config from "../../config";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Test User",
      email: "test@testlead.com",
      password: "password",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${config.CONFIG_API_ENDPOINT}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
    .then((res) => res.json())
    .then(() => {
        window.location.href = "/login";
    });
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="signupContainer">
        <div className="signupForm">
            <h1 className="signupHeader">Sign-Up</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input
                required
                type="text"
                id="name"
                value={name}
                onChange={this.handleNameChange}
                placeholder="John Doe"
              />
            </div>
            <div className="form-control">
              <label htmlFor="email">E-Mail</label>
              <input
                required
                type="text"
                id="email"
                value={email}
                onChange={this.handleEmailChange}
                placeholder="johndoe@address.com"
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                id="password"
                value={password}
                onChange={this.handlePasswordChange}
                placeholder="Type Here"
              />
            </div>
            <div className="signupFormButton">
              <button type="submit" className="signupButton">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
