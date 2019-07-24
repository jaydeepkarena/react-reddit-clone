import { requestPosts, receivedPosts, receivedError } from '../actions';
import axios from 'axios';
const getPosts = () => {
  return (dispatch, getState) => {
    dispatch(requestPosts);

    axios
      .get('http://localhost:5000/posts')
      .then(res => {
        console.log(`receivedPosts >>>`);
        console.log(res);
        // dispatch(receivedPosts(res))
      })
      .catch(err => {
        console.error(`receivedError >>>`);
        console.error(err);
        // dispatch(receivedError(err));
      });
  };
};

export default getPosts;
