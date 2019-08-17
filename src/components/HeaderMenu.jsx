import React from 'react';
import logo from '../assets/images/reddit_logo.svg';
import './HeaderMenu.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions';

const HeaderMenu = ({ id, name, userLogout, history }) => {
  const welComeText = `Welcome, ${name}`;
  const getUserName = () => {
    if (id) {
      return (
        <Link className="user-name clickable" to={`/u/${name}`}>
          {welComeText}
        </Link>
      );
    }
    return <div className="user-name"> {welComeText} </div>;
  };

  return (
    <>
      <div className="header-menu-container">
        <Link to="/" className="logo">
          <img src={logo} alt="logo here" className="reddit-logo" />
          <span>Reddit</span>
        </Link>
        {id ? (
          <>
            <Link to="/new-post" className="crate-post header-right-item">
              Create Post
            </Link>
            <Link className="logout header-right-item" onClick={userLogout} to="/">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/Login" className="login-button header-right-item">
              Login {id}
            </Link>
            <Link to="/signup" className="signup-button header-right-item">
              SignUp
            </Link>
          </>
        )}
        {getUserName()}
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
