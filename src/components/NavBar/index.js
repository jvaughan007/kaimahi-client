import React from 'react';
import { Link } from "react-router-dom";
import KaimahiContext from "../../KaimahiContext";
import config from "../../config";

class NavBar extends React.Component {
    static contextType = KaimahiContext;

    signOut = () => {
        fetch(`${config.CONFIG_API_ENDPOINT}/signout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            if (res.status === 204) {
                sessionStorage.removeItem("currentUser");
                this.context.setCurrentUser({});
                window.location.href = "/"
            }
        })
    }

    renderPublicLinks = () => {
        return (
            <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </>
        )
    }

    renderPrivateLinks = () => {
        return (
            <>
                <Link to="/dashboard">Dashboard</Link>
                <button type="button" onClick={this.signOut}>Logout</button>
            </>
        )
    }

    render() {
        const { currentUser } = this.context;
        return (
            <nav className="Nav">
                <div className="Nav_container">
                    <div className="appLogo">
                        <h2>kaimahi</h2>
                    </div>
                    <div className="navLinks">
                        <ul>
                            <Link to="/">Home</Link>
                            {currentUser.accessToken ? this.renderPrivateLinks() : this.renderPublicLinks()}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
};

export default NavBar;