import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from '../App';
import HeaderMenu from './HeaderMenu';
import Login from './Login';
import SignUp from './SignUp';
import NotFound from './NotFound';

const Root = () => {
  return (
    <div className="main-container">
      <HeaderMenu />
      <div>
        <Router>
          <Switch>
            <Route path="/" component={App} exact />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default Root;
