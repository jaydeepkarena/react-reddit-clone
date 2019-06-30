import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from '../App';
import HeaderMenu from './HeaderMenu';
import Login from './Login';
import SignUp from './SignUp';

const Root = () => {
  return (
    <div className="main-container">
      <HeaderMenu />
      <div>
        <Router>
          <Route path="/" component={App} exact />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Router>
      </div>
    </div>
  );
};

export default Root;
