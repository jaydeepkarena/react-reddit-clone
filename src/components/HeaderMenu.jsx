import React from 'react';
import logo from '../assets/images/reddit_logo.svg';
import './HeaderMenu.css';

function HeaderMenu() {
  return (
    <>
      <div className="header-menu-container">
        <div className="logo">
          <img src={logo} alt="logo here" className="reddit-logo" />
          <span>Reddit</span>
        </div>
        <a href="" className="crate-post" >Create Post</a>
        <div className="user-name">Username</div>
      </div>
    </>
  );
}

export default HeaderMenu;
