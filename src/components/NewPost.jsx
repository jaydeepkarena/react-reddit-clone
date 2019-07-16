import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

const NewPost = props => {
  if (!props.currentUserId) {
    return <Redirect to="/" />;
  }
  return (
     <>
      <div className="new-post">
        <h1>New Post</h1>
        <input type="text" name="post-title" placeholder="Title" />
        <textarea name="post-description" cols="30" rows="10" placeholder="Descripton(optional)" />
        <div className="control-group">
          <span>Select image:</span> <input type="file" accept="image/*" />
        </div>
        <div className="buttons">
          <button>Post</button>
          <button>Discard</button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ data: { currentUserId } }) => ({
  currentUserId
});

export default connect(mapStateToProps)(NewPost);
