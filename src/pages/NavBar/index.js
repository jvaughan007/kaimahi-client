import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NavBar extends React.Component {
    render() {
        return (
            <nav className="Nav">
                <div className="Nav_container">
                    <ul>
                        <Link to="/">Home</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </ul>
                </div>
            </nav>
        )
    }
};

// class DashboardNavBar extends Component {
//     render() {
//         return (
//             <nav className="Nav">
//                 <div className="Nav_container">
//                     <ul>
//                         <Link to="/">Home</Link>
//                         <Link to="/dashboard">Dashboard</Link>
//                         <Link to="/login">Login</Link>
//                         <Link to="/signup">Signup</Link>
//                     </ul>
//                 </div>
//             </nav>
//         )
//     }
// }

export default NavBar;