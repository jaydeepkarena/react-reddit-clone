import React from 'react';
import './Profile.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Profile = props => {
  if (!props.id) {
    return <Link to="/login">Login to continue</Link>;
  }

  return (<>
  <div className="profile">
    <div className="profile_image">
      <img src="" alt="profile" />
        {props.match.params.userid}
        <br />
        {props.id}
    </div>
  </div>
  </>);
};

const mapStateToProps = state => ({
  id: state.data.currentUserId
});

export default connect(mapStateToProps)(Profile);
