import React, { Component } from "react";
import config from "../../config"
import KaimahiContext from "../../KaimahiContext";

class LoginPage extends Component {
    static contextType = KaimahiContext;
    state = {
        email: null,
        password: null
    }

    loginAction = (e) => {
        e.preventDefault();
        fetch(`${config.CONFIG_API_ENDPOINT}/login`, {
            method: 'POST',
            body: JSON.stringify({ email: this.state.email, password: this.state.password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            delete data.password;
            // store in context
            this.context.setCurrentUser(data);
            // store in sessionStorage
            sessionStorage.setItem("currentUser", JSON.stringify(data));
            window.location.href = "/dashboard"
        }).catch(e => {
            console.log(e)
        })
    }

    changeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form className="loginForm" onSubmit={this.loginAction}>
                <div className="form-control">
                <label for="email">E-mail:</label>
                <input onChange={this.changeValue} type="email" name="email" id="email"/>
                </div>
                <div className="form-control">
                <label for="password">Password:</label>
                <input onChange={this.changeValue} type="password" name="password" id="password" />
                </div>
                <div className="loginFormButton">
                <button type="submit">Login</button>
                </div>
            </form>
        )
    }
}

export default LoginPage