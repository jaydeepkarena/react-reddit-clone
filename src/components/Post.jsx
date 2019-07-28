import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RemovePost } from '../store/actions';
import { toast } from 'react-toastify';

import './Post.css';
import { imageURL } from '../utils/config';
import API from '../utils/api';

const Post = ({ post, currentUserId, RemovePost }) => {
  const deletePost = async _id => {
    try {
      const {
        data: { success }
      } = await API.delete(`post/${_id}`);
      if (success) {
        RemovePost(_id);
        toast.success('Post deleted successfully!');
      }
    } catch (err) {
      console.log(`ERRRRROR>>>>>`);
      console.log(err.response.data);
      toast.error(`Oops, something went wrong!`);
    }
  };

  const deleteButton = () => {
    if (currentUserId === post.user) {
      return (
        <button className="delete-button" onClick={() => deletePost(post._id)}>
          Delete
        </button>
      );
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

const mapDispatchToProps = dispatch => ({
  RemovePost: id => dispatch(RemovePost(id))
});

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(Post);
