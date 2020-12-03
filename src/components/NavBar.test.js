import { render, screen } from '@testing-library/react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  }
import NavBar from './NavBar';
import React from 'react';
import ReactDOM from 'react-dom';

test('NavBar renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});