import React, { useRef } from 'react';
import './Profile.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Profile = props => {
  const emailRef = useRef(props.email);

  if (!props.id) {
    return <Link to="/login">Login to continue</Link>;
  }

  const handleEmailChange = (e) =>{
    console.log(e.name)
  }

  const update = () => {};

  return (
    <>
      <div className="profile">
        <input type="file" name="profile-image-selector" id="profile-image-selector"/>
        <div className="control-group">
          <img
            src={props.avatar}
            alt="profile"
            className="profile_image"
            width="150"
            height="150"
          />
        </div>
        <div className="control-group">
          <span className="profile_name"> {props.name}</span>
        </div>
        <div className="control-group">
          <label htmlFor="profile_email">Email: </label>
          <input
            type="text"
            name="profile_email"
            id="profile_email"
            ref={emailRef}
            value={props.email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="control-group profile_buttons">
          <button onClick={update}>Update</button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ data }) => ({
  id: data.currentUserId,
  name: data.currentUserName,
  email: data.currentUserEmail,
  avatar: data.avatar
});

export default connect(mapStateToProps)(Profile);
