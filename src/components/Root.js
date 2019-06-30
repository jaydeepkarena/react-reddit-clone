import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from '../App';
import Login from './Login';
import SignUp from './SignUp';

const Root = ({ store }) => {
  return (
    <Router>
      <Provider store={store}>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Provider>
    </Router>
  );
};

export default Root;
