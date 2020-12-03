import NavBar from './NavBar';
import KaimahiContext from '../KaimahiContext';
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';

test('NavBar renders without crashing', () => {
    const values = {
        currentUser: '',
        setCurrentUser: 'Josh'
    }
  const div = document.createElement('div');
  ReactDOM.render(
  <KaimahiContext.Provider value={values}>
      <Router>
          <NavBar />
          </Router>
          </KaimahiContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});