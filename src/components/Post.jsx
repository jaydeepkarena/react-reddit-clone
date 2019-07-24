import React from 'react';
import './Post.css'

const Post = ({ post }) => {
  return (
    <>
      <div className="post">
        <div className="post_title">{post.title}</div>
        <div className="post_description">{post.description}</div>
        {post.image && <img src={post.image} alt="" />}
      </div>
    </>
  );
};

export default Post;
