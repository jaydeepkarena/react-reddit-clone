import { requestPosts, receivedPosts, receivedError } from '../actions';
import axios from 'axios';
const getPosts = () => {
  return (dispatch, getState) => {
    console.log(`requestPosts >>>`)
    dispatch(requestPosts);

    axios
      .get('http://localhost:5000/posts')
      .then(res => {
        console.log(`receivedPosts >>>`);
        console.log(res.data);
         dispatch(receivedPosts(res.data))
      })
      .catch(err => {
        console.error(`receivedError >>>`);
        console.error(err.response.data);
        dispatch(receivedError(err.response.data.message));
      });
  };
};

export default getPosts;
