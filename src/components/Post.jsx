import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import './Post.css';
import { imageURL } from '../utils/config';
import API from '../utils/api';

const Post = ({ post, currentUserId }) => {
  const deletePost = async _id => {
    const result = await API.delete('post', { id: _id });
    console.log(`DELETE POST RESULT >>>`);
    console.log(result);
  };

  const deleteButton = () => {
    if (currentUserId === post.user) {
      return <button onClick={() => deletePost(post._id)}>X</button>;
    }
    return null;
  };

  return (
    <>
      <div className="post">
        <div className="post_title_group">
          <div className="post_title">{post.title}</div>
          {deleteButton()}
        </div>
        <div className="post_description">{post.description}</div>
        {post.image && <img src={`${imageURL}${post.image}`} alt="post_image" />}
        <div className="post_date">{moment(post.timestamp).fromNow()}</div>
      </div>
    </>
  );
};

const mapStateToPros = (state, props) => ({
  currentUserId: state.data.currentUserId,
  post: props.post
});

export default connect(mapStateToPros)(Post);
