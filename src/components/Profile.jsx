import React from 'react';
import './Profile.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Profile = props => {
  if (!props.id) {
    return <Link to="/login">Login to continue</Link>;
  }

  return <div> Profile Component of {props.match.params.userid} </div>;
};

const mapStateToProps = state => ({
  id: state.data.currentUserId
});

export default connect(mapStateToProps)(Profile);
