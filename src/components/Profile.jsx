import React, { useRef } from 'react';
import './Profile.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Profile = props => {
  const emailRef = useRef(props.email);

  if (!props.id) {
    return <Link to="/login">Login to continue</Link>;
  }

  const update = () => {};
  const reset = () => {
    emailRef.current.value = '';
  };

  return (
    <>
      <div className="profile">
        <div className="control-group">
          <img src="" alt="profile" className="profile_image" width="150" height="150" />
        </div>
        <div className="control-group">
          <span className="profile_name"> {props.name}</span>
        </div>
        <div className="control-group">
          <label htmlFor="profile_email" />
          <input type="text" name="profile_email" id="profile_email" ref={emailRef} />
        </div>
        <div className="control-group">
          <button onClick={update}>Login</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ data }) => ({
  id: data.currentUserId,
  name: data.currentUserName,
  email: data.currentUserEmail
});

export default connect(mapStateToProps)(Profile);
