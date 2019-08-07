import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import App from '../App';
import HeaderMenu from './HeaderMenu';
import Login from './Login';
import SignUp from './SignUp';
import NewPost from './NewPost';
import NotFound from './NotFound';
import Profile from './Profile'
import './Root.css';

toast.configure();

const Root = () => {
  return (
    <>
      <div className="main-container">
        <Router>
          <HeaderMenu />
          <div className="app-body">
            <Switch>
              <Route path="/" component={App} exact />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/new-post" component={NewPost} />
              <Route path="/u/:userid" component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
};

export default Root;
