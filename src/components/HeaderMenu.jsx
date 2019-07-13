import React from 'react';
import logo from '../assets/images/reddit_logo.svg';
import './HeaderMenu.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions';

const HeaderMenu = ({ id, name, userLogout }) => {
  return (
    <>
      <div className="header-menu-container">
        <div className="logo">
          <img src={logo} alt="logo here" className="reddit-logo" />
          <span>Reddit</span>
        </div>
        {id ? (
          <>
            <a href="/new-post" className="crate-post header-right-item">
              Create Post
            </a>
            <span className="logout header-right-item" onClick={() => userLogout()}>
              Logout
            </span>
          </>
        ) : (
          <>
            <Link to="/Login" className="login header-right-item">
              Login {id}
            </Link>
            <Link to="/signup" className="signup header-right-item">
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

const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderMenu);
