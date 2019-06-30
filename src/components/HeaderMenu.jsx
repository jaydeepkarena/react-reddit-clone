import React from 'react';
import logo from '../assets/images/reddit_logo.svg';
import './HeaderMenu.css';
import { connect } from 'react-redux';

const HeaderMenu = props => {
  return (
    <>
      <div className="header-menu-container">
        <div className="logo">
          <img src={logo} alt="logo here" className="reddit-logo" />
          <span>Reddit</span>
        </div>
        {props.id ? (
          <a href="x" className="crate-post">
            Create Post
          </a>
        ) : (
          <a href="x" className="crate-post">
            Login
          </a>
        )}
        <div className="user-name">Welcome, {props.name} </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    id: state.currentUser.id,
    email: state.currentUser.name,
    name: state.currentUser.name
  };
};

export default connect(mapStateToProps)(HeaderMenu);
