import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import App from '../App';
import HeaderMenu from './HeaderMenu';
import Login from './Login';
import SignUp from './SignUp';
import NotFound from './NotFound';

toast.configure();

const Root = () => {
  return (
    <div className="main-container">
      <Router>
        <HeaderMenu />
        <div>
          <Switch>
            <Route path="/" component={App} exact />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Root;
