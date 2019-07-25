import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../utils/api';

import './NewPost.css';

const initialState = {
  title: '',
  description: '',
  user: '',
  image: null
};

const NewPost = props => {
  const [state, setState] = useState(initialState);

  const createPost = e => {
    e.preventDefault();

    const { title, description, user, image } = state;
    var data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('user', user);
    data.append('image', image);

    API.post('new-post', data)
      .then(res => {
        toast.info('Post created successfully!');
        props.history.push('/');
      })
      .catch(err => {
        let errorMessage = '';
        if (err.response && err.response.data) errorMessage = err.response.data;
        else errorMessage = err;
        toast.error(errorMessage.toString());
        console.log(`ERROR`, errorMessage);
      });
  };

  const handleChange = e => {
    setState({
      ...state,
      user: props.currentUserId,
      [e.target.name]: e.target.value
    });
  };

  if (!props.currentUserId) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <form action="/new-post" method="post" onSubmit={createPost}>
        <div className="new-post">
          <h1>New Post</h1>
          <input type="text" name="title" placeholder="Title" onChange={handleChange} />
          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="Descripton(optional)"
            onChange={handleChange}
          />
          <div className="control-group">
            <span>Select image:</span>{' '}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={e => setState({ ...state, image: e.target.files[0] })}
            />
          </div>
          <div className="buttons">
            <input type="submit" value="Submit" onClick={createPost} />
            <input type="reset" value="Reset" onClick={() => setState(initialState)} />
          </div>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = ({ data: { currentUserId } }) => ({
  currentUserId
});

export default connect(mapStateToProps)(NewPost);
