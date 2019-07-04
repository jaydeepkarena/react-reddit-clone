import React from 'react';
import logo from '../assets/images/reddit_logo.svg';
import './HeaderMenu.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HeaderMenu = ({ id, name }) => {
  return (
    <>
      <div className="header-menu-container">
        <div className="logo">
          <img src={logo} alt="logo here" className="reddit-logo" />
          <span>Reddit</span>
        </div>
        {id ? (
          <a href="/new-post" className="crate-post">
            Create Post
          </a>
        ) : (
          <>
            <Link to="/Login" className="login">
              Login {id}
            </Link>
            <Link to="/signup" className="signup">
              SignUp
            </Link>
          </>
        )}
        <div className="user-name">Welcome, {name} </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  id: state.data.currentUserId,
  name: state.data.currentUserName,
  email: state.data.currentUserEmail
});

export default connect(mapStateToProps)(HeaderMenu);
