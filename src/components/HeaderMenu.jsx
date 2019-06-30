import React, { useContext } from 'react';
import logo from '../assets/images/reddit_logo.svg';
import './HeaderMenu.css';
import { UsersContext } from '../App';

function HeaderMenu() {
  const users = useContext(UsersContext);
  return (
    <>
      <div className="header-menu-container">
        <div className="logo">
          <img src={logo} alt="logo here" className="reddit-logo" />
          <span>Reddit</span>
        </div>
        <a href="x" className="crate-post">
          Create Post
        </a>
        <div className="user-name">Welcome, {users[0].name} </div>
      </div>
    </>
  );
}

export default HeaderMenu;
