import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
        <div className="buttons">
          <button>Submit</button>
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
