import React from 'react';
import logo from '../assets/images/reddit_logo.svg';
import './HeaderMenu.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HeaderMenu = props => {
  return (
    <>
      <div className="header-menu-container">
        <div className="logo">
          <img src={logo} alt="logo here" className="reddit-logo" />
          <span>Reddit</span>
        </div>
        {props.id ? (
          <a href="/new-post" className="crate-post">
            Create Post
          </a>
        ) : (
          <>
            <Link to="/Login" className="login">
              Login
            </Link>
            <Link to="/signup" className="signup">
              SignUp
            </Link>
          </>
        )}
        <div className="user-name">Welcome, {props.name} </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ currentUserId, currentUserName, currentUserEmail }) => {
  return {
    id: currentUserId,
    name: currentUserName,
    email: currentUserEmail
  };
};

export default connect(mapStateToProps)(HeaderMenu);
