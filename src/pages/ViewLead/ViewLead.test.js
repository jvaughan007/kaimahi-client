import HomePage from './index';
import NavBar from '../../components/NavBar'
import KaimahiContext from '../../KaimahiContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';
import { ContextDataWithUserInformation } from "../../test-mock"

test('View Lead Page renders without crashing', () => {
  const values = ContextDataWithUserInformation;
  const div = document.createElement('div');
  ReactDOM.render(
  <KaimahiContext.Provider value={values}>
    <Router>
      <NavBar />
      <Switch> 
        <Route currentUser={values} exact path="/leads/:lead_id" component={HomePage} />
      </Switch>
    </Router>
  </KaimahiContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});