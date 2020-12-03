import React from 'react';
import ReactDOM from 'react-dom'
import AddLeadForm from './index'


test('Login Page renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddLeadForm />, div);
    ReactDOM.unmountComponentAtNode(div);
});