import React from 'react';
import ReactDOM from 'react-dom'
import Signup from './index'

test('Signup form page renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Signup />, div);
    ReactDOM.unmountComponentAtNode(div);
});