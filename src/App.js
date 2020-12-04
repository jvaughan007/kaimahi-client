import React, { Component, useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ViewLead from "./pages/ViewLead";
import NavBar from "./components/NavBar";
import KaimahiContext from "./KaimahiContext";
import Signup from "./pages/Signup";
import './App.css';

export const PrivateRoute = ({component: Component, currentUser, ...rest}) => {
  const [loading, setLoading] = useState(true)
  console.log('herec')
  useEffect(() => {
    if(currentUser.accessToken) {
      setLoading(false);
    }
  }, [currentUser]);
  if (loading) {
    return <div>Loading...</div>
  }
  return !loading && currentUser.accessToken ? <Component {...rest} /> : <Redirect to="/login" />
}

class App extends Component {
  state = {
    currentUser: {}
  }

  componentDidMount() {
    const currentUser = sessionStorage.getItem("currentUser") || "{}";
    this.setState({
      currentUser: JSON.parse(currentUser)
    });
  }

  setCurrentUser = (user) => {
    this.setState({
      currentUser: user
    });
  }

  render() {
    const values = {
      currentUser: this.state.currentUser,
      setCurrentUser: this.setCurrentUser
    }
    return (
      <KaimahiContext.Provider value={values}>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute currentUser={this.state.currentUser} exact path="/dashboard" component={Dashboard} />
            <PrivateRoute currentUser={this.state.currentUser} exact path="/leads/:lead_id" component={ViewLead} />
            {/* <PrivateRoute currentUser={this.state.currentUser} exact path="/" component={AddLead} /> */}
          </Switch>
        </BrowserRouter>
      </KaimahiContext.Provider>
    );
  }
}

export default App;
