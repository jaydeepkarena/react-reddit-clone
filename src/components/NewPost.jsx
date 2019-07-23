import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './NewPost.css';

const NewPost = props => {
  const [state, setState] = useState({
    title: '',
    description: '',
    user: '',
    image: null
  });

  const createPost = e => {
    e.preventDefault();

    const { title, description, user, image } = state;
    var data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('user', user);
    data.append('image', image);

    console.log(`STATE >>>`);
    console.log(state);

    axios
      .post('http://localhost:5000/new-post', data)
      .then(response => console.log(response.data))
      .catch(err => console.log(`ERROR`, err));
  };

  const handleChange = e => {
    setState({
      ...state,
      user: props.currentUserId,
      [e.target.name]: e.target.value
    });
    console.log(`STATE >>>`);
    console.log(state);
  };

  if (!props.currentUserId) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <form action="/new-post" method="post" enctype="multipart/form-data" onSubmit={createPost}>
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
            <button>Discard</button>
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
