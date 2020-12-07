import React, { Component } from "react";
import config from '../../config';




class Signup extends Component {
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('signup button clicked');
        console.log(this.state);
        console.log(`${this.state.name} created with e-mail ${this.state.email}`);
        fetch(`${config.CONFIG_API_ENDPOINT}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(() => {
            window.location.href='/login';
        })
        
    }

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password:''
        }
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        const { name, email, password } = this.state
    return (
    <div className="signupContainer">
        <h3 className="signupHeader">Sign-Up</h3>
        <div className="signupForm"> 
            <form ref="form" onSubmit={this.handleSubmit}>
                <div className="form-control">
                    <label for="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={this.handleNameChange} placeholder="John Doe" />
                </div>
                <div className="form-control">
                    <label for="email">E-Mail:</label>
                    <input type="text" id="email" value={email} onChange={this.handleEmailChange} placeholder="johndoe@address.com" />
                </div>
                <div className="form-control">
                    <label for="password">Password:</label>
                    <input type="text" id="password" value={password} onChange={this.handlePasswordChange} placeholder="Type Here" />
                </div>
                <button type="submit" className="signupButton" >Register</button>
            </form>
        </div>  
    </div>
    )}
}

export default Signup;