import { requestPosts, receivedPosts, receivedError } from '../actions';
import axios from 'axios';
const getPosts = () => {
  return (dispatch, getState) => {
    dispatch(requestPosts());

    axios
      .get('http://localhost:5000/posts')
      .then(res => dispatch(receivedPosts(res.data)))
      .catch(err => dispatch(receivedError(err.response.data)));
  };
};

export default getPosts;
