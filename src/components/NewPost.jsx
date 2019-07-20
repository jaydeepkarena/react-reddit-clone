import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

const NewPost = props => {
  const [state, setState] = useState({
    title: '',
    description: '',
    image: '',
    user: ''
  });

  const createPost = e => {
    e.preventDefault();

    fetch('http://localhost:5000/new-post', {
      method: 'POST',
      mode:'cors',
      body: JSON.stringify(state),
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => res.json())
      .catch(err => console.log(`ERROR`, err));
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
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
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
