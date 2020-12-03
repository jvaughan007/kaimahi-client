import React from "react";

const HomePage = () => {
    return <div>
        <WelcomeSection />
        <AboutSection />
    </div>
}

// class NavBar extends React.Component {
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
// };


const WelcomeSection = () => {
    return (
        <section>
            <WelcomeHeader />
            <WelcomeDescription />
        </section>
    )
};

const WelcomeHeader = () => <h2>Welcome to Kaimahi!</h2>;
const WelcomeDescription = () => <h4>The Lead Management and Tracking App</h4>;

const AboutSection = () => {
        return (
            <section className="About_Kaimahi">
                <div className="Overview">
                    <h3>What is Kaimahi?</h3>
                    <p>Kaimahi is a no-frills lead management application designed for simplicity. Our application allows you to add and manage all of your sales leads in a convenient, easy to navigate application.</p>
                </div>
                <div className="Features">
                    <h3>Features</h3>
                    <ul>
                        <li>Add leads to your list</li>
                        <li>Keep track of their contact information</li>
                        <li>Track when they were contacted last</li>
                    </ul>
                </div>
            </section>
        )
    };


export default HomePage;