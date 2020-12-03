import ViewLead from './index';
import NavBar from '../../components/NavBar'
import KaimahiContext from '../../KaimahiContext';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

test('View Lead renders with NavBar without crashing', () => {
    const values = {
        currentUser: '',
        setCurrentUser: 'Josh',
        accessToken: 'imdeveloper',
        lead: [{ }]
    }
    const PrivateRoute = ({component: Component, currentUser, ...rest}) => {
        const [loading, setLoading] = useState(true)
        useEffect(() => {
          if(values.accessToken) {
            setLoading(false);
          }
        }, [currentUser]);
        if (loading) {
          return <div>Loading...</div>
        }
        return !loading && currentUser.accessToken ? <Component {...rest} /> : <Redirect to="/login" />
      }
  const div = document.createElement('div');
  ReactDOM.render(
  <KaimahiContext.Provider value={values}>
      <Router>
          <NavBar />
          <Switch> 
          <PrivateRoute currentUser={values} exact path="/leads/:lead_id" component={ViewLead} />
            </Switch>
          </Router>
          </KaimahiContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});