import React from 'react';
import logo from '../assets/images/reddit_logo.svg';
import './HeaderMenu.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions';

const HeaderMenu = ({ id, name }) => {
  return (
    <>
      <div className="header-menu-container">
        <div className="logo">
          <img src={logo} alt="logo here" className="reddit-logo" />
          <span>Reddit</span>
        </div>
        {id ? (
          <>
            <a href="/new-post" className="crate-post">
              Create Post
            </a>
            {/* <a href="" className="logout" onClick={logout}>
              Logout
            </a> */}
          </>
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

const mapStateToProps = ({
  data: { currentUserId: id, currentUserName: name, currentUserEmail: email }
}) => ({
  id,
  name,
  email
});

export default connect(mapStateToProps)(HeaderMenu);
