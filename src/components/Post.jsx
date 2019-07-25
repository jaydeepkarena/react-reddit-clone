import React from 'react';
import './Post.css';
import moment from 'moment';
import { imageURL } from '../utils/config';

const Post = ({ post }) => {
  return (
    <>
      <div className="post">
        <div className="post_title">{post.title}</div>
        <div className="post_description">{post.description}</div>
        {post.image && <img src={`${imageURL}${post.image}`} alt="post_image" />}
        <div className="post_date">{moment(post.timestamp).fromNow()}</div>
      </div>
    </>
  );
};

export default Post;
